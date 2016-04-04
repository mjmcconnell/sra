"""Api endpoints to interactions for the Page ndb model
"""
# local imports
from app.base.handlers import BaseAjaxHandler
from app.base.handlers import AdminAjaxHandler
from app.handlers.apis.mixins import ListMixin
from app.handlers.apis.mixins import RetrieveMixin
from app.handlers.apis.mixins import UpdateMixin

from app.forms.pages import PageForm
from app.models.pages import MetaData
from app.models.pages import Page


class PublicMetaDataList(ListMixin, BaseAjaxHandler):

    model = MetaData


class PublicPageList(ListMixin, BaseAjaxHandler):

    model = Page


class AdminPageList(ListMixin, AdminAjaxHandler):

    form = PageForm
    model = Page


class AdminPageDetail(RetrieveMixin, UpdateMixin, AdminAjaxHandler):

    form = PageForm
    model = Page
