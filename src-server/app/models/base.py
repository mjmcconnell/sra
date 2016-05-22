"""Base datastore models and queries
"""
# future imports
from __future__ import absolute_import

# stdlib imports
import logging
import os
from uuid import uuid4

# third-party imports
import appengine_config
from google.appengine.api import memcache
from google.appengine.ext import ndb

# local imports
from app.utils import storage


class BaseModel(ndb.Model):
    """Common data/operations for all storage models
    """

    cache_keys = []
    sort_order = None

    @classmethod
    def _post_delete_hook(cls, key, future):
        memcache.flush_all()

    def _post_put_hook(self, future):
        memcache.flush_all()

    def _get_filename(self, prop):
        return prop.split('/')[-1] if prop else None

    @classmethod
    def generate_bucket_url(self, image_name):
        """Create a url for the gcs bucket,
        that is unique and identifiable to the record
        """
        return '/'.join([self.__name__, str(uuid4()), image_name])

    def build_public_url(self, url):
        return storage.get_public_serving_url(url)

    @classmethod
    def create(cls, form, defaults=None):
        """Create a new bdn record, from a submitted form.
        """
        record = cls()
        # Update the new record with default values
        if defaults:
            for key, value in defaults.iteritems():
                setattr(record, key, value)

        return record.update(form)

    @classmethod
    def get_cache_key(cls, *args):
        _parts = [cls.__name__]
        for arg in args:
            _parts.append(str(arg))
        return '-'.join(_parts)

    @classmethod
    def get_queryset(cls):
        queryset = cls.query()
        if cls.sort_order:
            queryset = queryset.order(getattr(cls, cls.sort_order))
        return queryset

    @classmethod
    def fetch_cached_dataset(cls):
        """Fetches model related data from memcache,
        If no records are found then fetches them directly from the datastore,
        and adds the results into memcache for future references.

        Returns the matched records in dictionary format
        """
        # Build the cache key using the model name and locale id
        cache_key = cls.get_cache_key()

        dataset = memcache.get(cache_key)
        if dataset is None:
            dataset = []
            # Store the queried data in memcache for 1 day
            for r in cls.get_queryset().fetch():
                dataset.append(r.to_dict())
            memcache.add(cache_key, dataset, 86400)

        return dataset

    @classmethod
    def group_by(cls, group_property):
        cache_key = cls.get_cache_key('group_by', group_property)

        grouped_records = memcache.get(cache_key)
        if not grouped_records:
            grouped_records = {}
            for p in cls.fetch_cached_dataset():
                grouped_records.update({p[group_property]: p})

            # Store the queried data in memcache for 1 day
            memcache.add(cache_key, grouped_records, 86400)

        return grouped_records

    def to_dict(self, flatten=False):
        """Serialise model instance to a dictionary (to make it play nice with
        json.dumps())
        """
        d = super(BaseModel, self).to_dict()
        if flatten:
            flat_record = {}
            for k, v in self.serialise(d).iteritems():
                if type(v) is not dict:
                    flat_record[k] = v
                else:
                    label = '{}__'.format(k)
                    for ck, cv in v.iteritems():
                        flat_record[label + ck] = cv

            return flat_record

        return self.serialise(d)

    def fetch_default_image(self, prop):
        path = False
        # path to cms default images
        default_dir = os.path.join(
            'static',
            'cms',
            'img',
            'defaults',
            self.key.kind().lower()
        )

        # Check for multiple file extensions
        jpg_prop = '.'.join([prop, 'jpg'])
        png_prop = '.'.join([prop, 'png'])
        # check if file exists
        if os.path.isfile(os.path.join(appengine_config.BUNDLE_ROOT, default_dir, jpg_prop)):
            path = '/' + os.path.join(default_dir, jpg_prop)
        elif os.path.isfile(os.path.join(appengine_config.BUNDLE_ROOT, default_dir, png_prop)):
            path = '/' + os.path.join(default_dir, png_prop)
        else:
            logging.info('Missing default asset: %s', os.path.join(default_dir, png_prop))
        return path

    def serialise(self, _dict):
        serialised_dict = {}
        serialised_dict['id'] = self.key.id()
        serialised_dict['ukey'] = self.key.urlsafe()

        # Fetch any child records as well, as any ndb keys in the dict
        # will break json serialisation.
        for prop, value in _dict.iteritems():
            if type(value) == ndb.Key:
                try:
                    serialised_dict[prop] = value.get().to_dict()
                except Exception as e:
                    logging.error(e)
            elif prop.endswith('_bucket_url'):
                if value is None:
                    value = self.fetch_default_image(prop)
            else:
                serialised_dict[prop] = value

        return serialised_dict

    def update(self, form):
        """Update a records property values from a form's request data.
        """
        child_record = None
        for field in form:
            if '__' in field.name:
                child_model, field_name = field.name.split('__')
                child_record = getattr(self, child_model).get()
                setattr(child_record, field_name, field.data)

        if child_record:
            child_record.put()

        # Populate the record with the form request data
        form.populate_obj(self)
        # Save the record to the datastore
        return self.put().get()


class OrderMixin(object):
    """Mixin to handle a user defined sort order.
    """

    sort_order = 'order'

    order = ndb.IntegerProperty()

    def _post_put_hook(self, future):
        """Ensure order value is set, if not then set it to the
        total number of current records
        """
        if self.order is None:
            self.order = self.query().count()
            self.put()

        memcache.flush_all()

    @classmethod
    def _post_delete_hook(cls, key, future):
        super(OrderMixin, cls)._post_delete_hook(key, future)
        # If the records have ordering applied, reset the ordering,
        # to prevent spaces in the order system.
        if hasattr(cls, 'order'):
            records = cls.query().order(cls.order)
            for i, r in enumerate(records):
                r.order = i
                r.put()

    @classmethod
    def create(cls, form, defaults=None):
        """Set the initial order value for the record."""
        if defaults is None:
            defaults = {}

        defaults['order'] = cls.query().count()

        return super(OrderMixin, cls).create(form, defaults)
