"""Api endpoints to interactions for the Page ndb model
"""
# local imports
from app.base.handlers import AdminAjaxHandler
from app.handlers.apis.mixins import ListMixin
from app.handlers.apis.mixins import OrderMixin
from app.handlers.apis.mixins import RetrieveMixin
from app.handlers.apis.mixins import UpdateMixin

from app.forms.pages.base import PageForm
from app.models.pages import MetaData


class AdminList(ListMixin, OrderMixin, AdminAjaxHandler):

    form = PageForm
    model = MetaData
    sort_order = 'order'


class AdminDetail(RetrieveMixin, UpdateMixin, AdminAjaxHandler):

    form = PageForm
    model = MetaData
