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
from app.utils import storage


class MetaData(OrderMixin, BaseModel):

    tag = ndb.StringProperty(required=True, indexed=True)
    title = ndb.StringProperty(required=True, indexed=False)
    nav = ndb.StringProperty(required=True, indexed=False)
    description = ndb.StringProperty(required=False, indexed=False)
    tags = ndb.StringProperty(required=False, repeated=True, indexed=False)
    visible = ndb.BooleanProperty(default=False)
    page = ndb.KeyProperty()

    cache_keys = ['MetaData-group_by-tag']

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
                    if key == 'page':
                        page_record = value.query().get()
                        if page_record:
                            p_key = page_record.key()
                        else:
                            p_key = value().put()
                        record.page = p_key
                    else:
                        setattr(record, key, value)
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


class BasePage(BaseModel):

    title = ndb.StringProperty(required=False, indexed=False)
    sub_title = ndb.StringProperty(required=False, indexed=False)


class HomePage(BasePage):

    # Gallery Banner
    gallery_title = ndb.StringProperty(required=False, indexed=False)
    gallery_copy = ndb.TextProperty(required=False, indexed=False)
    gallery_image = ndb.StringProperty(required=False, indexed=False)
    gallery_image_filename = ndb.ComputedProperty(
        lambda self: self._get_filename(self.gallery_image))
    gallery_image_bucket_url = ndb.ComputedProperty(
        lambda self: storage.get_public_serving_url(self.gallery_image))
    # Events banner
    events_title = ndb.StringProperty(required=False, indexed=False)
    events_copy = ndb.TextProperty(required=False, indexed=False)
    events_image = ndb.StringProperty(required=False, indexed=False)
    events_image_filename = ndb.ComputedProperty(
        lambda self: self._get_filename(self.events_image))
    events_image_bucket_url = ndb.ComputedProperty(
        lambda self: storage.get_public_serving_url(self.events_image))


class AboutPage(BasePage):

    pass


class EventsPage(BasePage):

    pass


class GalleryPage(BasePage):

    pass


class ContactPage(BasePage):

    pass


PAGE_MAP = OrderedDict([
    ('home', {
        'title': 'Home',
        'nav': 'Home',
        'visible': True,
        'page': HomePage,
    }),
    ('gallery', {
        'title': 'Gallery',
        'nav': 'Gallery',
        'visible': True,
        'page': GalleryPage,
    }),
    ('events', {
        'title': 'Events',
        'nav': 'Events',
        'visible': True,
        'page': EventsPage,
    }),
    ('about', {
        'title': 'About',
        'nav': 'About',
        'visible': True,
        'page': AboutPage,
    }),
    ('contact', {
        'title': 'Contact',
        'nav': 'Contact',
        'visible': True,
        'page': ContactPage,
    }),
])
