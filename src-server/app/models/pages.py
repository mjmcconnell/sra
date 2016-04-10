"""Store grouped partners and their offers, in the datastore
"""
# future imports
from __future__ import absolute_import

# stdlib imports
from collections import OrderedDict

# third-party imports
from google.appengine.api import memcache
from google.appengine.ext import ndb

# local imports
from app.models.base import BaseModel
from app.models.base import OrderMixin


PAGE_MAP = OrderedDict([
    ('home', {
        'title': 'Home',
        'visible': True
    }),
    ('gallery', {
        'title': 'Gallery',
        'visible': True
    }),
    ('contact', {
        'title': 'Contact',
        'visible': True
    }),
])


class MetaData(OrderMixin, BaseModel):

    tag = ndb.StringProperty(required=True, indexed=True)
    title = ndb.StringProperty(required=True, indexed=False)
    description = ndb.StringProperty(required=False, indexed=False)
    tags = ndb.StringProperty(required=False, repeated=True, indexed=False)
    visible = ndb.BooleanProperty(default=False)
    page = ndb.KeyProperty(kind='Page')

    @classmethod
    def fetch_or_create(cls):
        """Create the initail meta_data records for each page.

        Loop through each page in the map to create a corresponding
        datastore record, and provide initital default values.
        """
        records = []
        for tag, defaults in PAGE_MAP.iteritems():
            # look for an existing record
            record = cls.get_by_tag(tag)
            # If none is found, then create a new one.
            if record is None:
                record = cls(tag=tag)
                for key, value in defaults.iteritems():
                    setattr(record, key, value)
                record.page = Page().put()
                record.put()

            records.append(record.to_dict())

        return records

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
        if not dataset:
            dataset = cls.fetch_or_create()
            # Store the queried data in memcache for 1 day
            memcache.add(cache_key, dataset, 86400)

        return dataset

    @classmethod
    def get_by_tag(cls, tag):
        return cls.query(cls.tag == tag).get()

    def update(self, form):
        """Update a records property values from a form's request data.
        """
        form.tags.data = [
            t.strip() for t in form.tags.data.split(',') if t
        ]
        return super(MetaData, self).update(form)


class Page(BaseModel):

    title = ndb.StringProperty(required=False, indexed=False)
    copy = ndb.StringProperty(required=False, indexed=False)
