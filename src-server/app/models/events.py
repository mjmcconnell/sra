"""Store grouped partners and their offers, in the datastore
"""
# future imports
from __future__ import absolute_import

# third-party imports
from google.appengine.ext import ndb

# local imports
from app.models.base import BaseModel
from app.models.base import OrderMixin
from app.utils import storage


class Event(OrderMixin, BaseModel):

    title = ndb.StringProperty(required=True, indexed=False)
    content = ndb.StringProperty(required=False, indexed=False)
    image = ndb.StringProperty(required=False, indexed=False)
    image_filename = ndb.ComputedProperty(
        lambda self: self.image.split('/')[-1])
    image_bucket_url = ndb.ComputedProperty(
        lambda self: storage.get_public_serving_url(self.image))
    link_label = ndb.StringProperty(required=False, indexed=False)
    link_url = ndb.StringProperty(required=False, indexed=False)
