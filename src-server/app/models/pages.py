"""Store grouped partners and their offers, in the datastore
"""
# future imports
from __future__ import absolute_import

# third-party imports
from google.appengine.ext import ndb

# local imports
from app.models.base import BaseModel
from app.models.base import OrderMixin


class MetaData(OrderMixin, BaseModel):

    title = ndb.StringProperty(required=True, indexed=False)
    description = ndb.StringProperty(required=False, indexed=False)
    tags = ndb.StringProperty(required=False, repeated=True, indexed=False)
    visible = ndb.BooleanProperty(default=False)
    page = ndb.KeyProperty(kind='Page')


class Page(BaseModel):

    title = ndb.StringProperty(required=True, indexed=False)
    copy = ndb.StringProperty(required=False, indexed=False)
