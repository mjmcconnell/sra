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


class Image(OrderMixin, UploadMixin, BaseModel):

    title = ndb.StringProperty(required=True, indexed=False)
    description = ndb.StringProperty(required=False, indexed=False)
    layout = ndb.StringProperty(choices=['square', 'tall', 'wide'])
    image = ndb.StringProperty(required=False, indexed=False)
    image_filename = ndb.ComputedProperty(
        lambda self: self.image.split('/')[-1])
    image_bucket_url = ndb.ComputedProperty(
        lambda self: self.build_public_url(self.image))
