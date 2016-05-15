"""Store grouped partners and their offers, in the datastore
"""
# future imports
from __future__ import absolute_import

# third-party imports
from google.appengine.ext import ndb

# local imports
from app.models.base import BaseModel
from app.models.base import OrderMixin


class AboutModule(OrderMixin, BaseModel):

    title = ndb.StringProperty(required=True, indexed=False)
    content = ndb.StringProperty(required=True, indexed=False)
