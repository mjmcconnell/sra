"""Base datastore models and queries
"""
# future imports
from __future__ import absolute_import

# stdlib imports
import logging
from uuid import uuid4

# third-party imports
from google.appengine.api import memcache
from google.appengine.ext import ndb

# local imports
from app.utils import storage


class BaseModel(ndb.Model):
    """Common data/operations for all storage models
    """

    @classmethod
    def _post_delete_hook(cls, key, future):
        cls.clear_cache(key)

    @classmethod
    def create(cls, form, _id=None, defaults=None):
        """Tries to fetch an existing record,
        if none is found a new record is created.
        """
        record = cls()
        # Update the new record with default values
        if defaults:
            for key, value in defaults.iteritems():
                setattr(record, key, value)

        return record.update(form)

    @classmethod
    def clear_cache(cls, key):
        """Flush the cached querysets for the model.
        """
        if key.parent():
            queryset_key = cls.get_cache_key(key.parent().id())
            memcache.delete(queryset_key)

            # Clean up any cached records
            if cls.cache_keys:
                memcache.delete_multi(
                    [cls.get_cache_key(k) for k in cls.cache_keys]
                )

    @classmethod
    def get_cache_key(cls, *args):
        _parts = [cls.__name__]
        for arg in args:
            _parts.append(str(arg))
        return '-'.join(_parts)

    @classmethod
    def fetch_cached_dataset(cls, parent_key):
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
            for r in cls.query().fetch():
                dataset.append(r.to_dict())
            memcache.add(cache_key, dataset, 86400)

        return dataset

    def _post_put_hook(self, future):
        self.clear_cache(self.key)

    def to_dict(self):
        """Serialise model instance to a dictionary (to make it play nice with
        json.dumps())
        """
        d = super(BaseModel, self).to_dict()

        return self.serialise(d)

    def serialise(self, _dict):
        serialised_dict = {}
        serialised_dict['id'] = self.key.id()

        # Fetch any child records as well, as any ndb keys in the dict
        # will break json serialisation.
        for prop, value in _dict.iteritems():
            if type(value) == ndb.Key:
                try:
                    serialised_dict[prop] = value.get().to_dict()
                except Exception as e:
                    logging.error(e)
            else:
                serialised_dict[prop] = value

        return serialised_dict

    def update(self, form):
        """Update a records property values from a form's request data.
        """
        # Populate the record with the form request data
        form.populate_obj(self)
        # Save the record to the datastore
        return self.put().get()


class OrderMixin(object):
    """Mixin to handle a user defined sort order.
    """

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
    def create_or_update(cls, form, _id=None, defaults=None):
        """Set the initial order value for the record."""
        if defaults is None:
            defaults = {}

        if _id is None:
            defaults['order'] = cls.query().count()

        return super(OrderMixin, cls).create_or_update(
            form, _id, defaults)


class UploadMixin(object):
    """Mixin to handle image uploads.
    """

    @classmethod
    def _pre_delete_hook(cls, key):
        """Remove the image from gcs
        """
        for k, v in key.get().to_dict().iteritems():
            if k.startswith('image_url') and v:
                storage.remove_file(v)

    @classmethod
    def generate_bucket_url(self, image_name):
        """Create a url for the gcs bucket,
        that is unique and identifiable to the record
        """
        return '/'.join([self.__name__, str(uuid4()), image_name])

    def build_public_url(self, url):
        return storage.get_public_serving_url(url)
