"""Api endpoints to interactions for the Image ndb model
"""
# local imports
from app.base.handlers import AdminAjaxHandler
from app.handlers.apis.mixins import ListCreateMixin
from app.handlers.apis.mixins import OrderMixin
from app.handlers.apis.mixins import RetrieveUpdateDeleteMixin

from app.forms.about_modules import AboutModuleForm
from app.models.about_modules import AboutModule


class AdminList(ListCreateMixin, OrderMixin, AdminAjaxHandler):

    form = AboutModuleForm
    model = AboutModule
    sort_order = 'order'


class AdminDetail(RetrieveUpdateDeleteMixin, AdminAjaxHandler):

    form = AboutModuleForm
    model = AboutModule
