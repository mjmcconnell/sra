"""Api endpoints to interactions for the Page ndb model
"""
# local imports
from app.base.handlers import BaseAjaxHandler
from app.base.handlers import AdminAjaxHandler
from app.handlers.apis.mixins import ListMixin
from app.handlers.apis.mixins import OrderMixin
from app.handlers.apis.mixins import RetrieveMixin
from app.handlers.apis.mixins import UpdateMixin

from app.forms.pages import PageForm
from app.models.pages import MetaData


def _create_pages():
    pass


class PublicPageDetail(RetrieveMixin, BaseAjaxHandler):

    model = MetaData


class AdminPageList(ListMixin, OrderMixin, AdminAjaxHandler):

    form = PageForm
    model = MetaData


class AdminPageDetail(RetrieveMixin, UpdateMixin, AdminAjaxHandler):

    form = PageForm
    model = MetaData
