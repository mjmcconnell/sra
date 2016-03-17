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


class ImageGroup(BaseModel, OrderMixin):

    label = ndb.StringProperty(required=True, indexed=False)
    route = ndb.StringProperty(required=True)
    title = ndb.StringProperty(required=True, indexed=False)
    copy = ndb.StringProperty(required=False, indexed=False)

    @classmethod
    def _post_delete_hook(cls, key, future):
        """Recursively remove associated partners when a group is removed.
        """
        child_keys = Image.query(keys_only=True, Image.group==key).fetch()
        ndb.delete_multi(child_keys)
        super(ImageGroup, cls)._post_delete_hook(key, future)


class Image(BaseModel, OrderMixin, UploadMixin):

    group = ndb.KeyProperty(kind=ImageGroup, required=True)
    title = ndb.StringProperty(required=True, indexed=False)
    description = ndb.StringProperty(required=False, indexed=False)
    image_url = ndb.StringProperty(required=False, indexed=False)
    bucket_image_url = ndb.ComputedProperty(
        lambda self: self.build_public_url(self.image_url))
