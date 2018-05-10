"""Api endpoints to interactions for the Image ndb model
"""
# local imports
from app.base.handlers import AdminAjaxHandler
from app.handlers.apis.mixins import ListCreateMixin
from app.handlers.apis.mixins import OrderMixin
from app.handlers.apis.mixins import RetrieveUpdateDeleteMixin

from app.forms.images import ImageForm
from app.models.images import Image


class AdminList(ListCreateMixin, OrderMixin, AdminAjaxHandler):

    form = ImageForm
    model = Image
    sort_order = 'order'


class AdminDetail(RetrieveUpdateDeleteMixin, AdminAjaxHandler):

    form = ImageForm
    model = Image
