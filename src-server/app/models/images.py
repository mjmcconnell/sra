"""Store grouped partners and their offers, in the datastore
"""
# future imports
from __future__ import absolute_import

# third-party imports
from google.appengine.ext import ndb

# local imports
from app.models.base import BaseModel
from app.models.base import OrderMixin
from app.models.base import UploadMixin
from app.utils import storage


class Image(OrderMixin, UploadMixin, BaseModel):

    title = ndb.StringProperty(required=True, indexed=False)
    description = ndb.StringProperty(required=False, indexed=False)
    image = ndb.StringProperty(required=False, indexed=False)
    image_filename = ndb.ComputedProperty(
        lambda self: self.image.split('/')[-1])
    image_bucket_url = ndb.ComputedProperty(
        lambda self: storage.get_public_serving_url(self.image))
