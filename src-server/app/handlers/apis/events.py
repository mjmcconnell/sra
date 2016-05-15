"""Api endpoints to interactions for the Image ndb model
"""
# local imports
from app.base.handlers import AdminAjaxHandler
from app.handlers.apis.mixins import ListCreateMixin
from app.handlers.apis.mixins import OrderMixin
from app.handlers.apis.mixins import RetrieveUpdateDeleteMixin

from app.forms.events import EventForm
from app.models.events import Event


class AdminList(ListCreateMixin, OrderMixin, AdminAjaxHandler):

    form = EventForm
    model = Event
    sort_order = 'order'


class AdminDetail(RetrieveUpdateDeleteMixin, AdminAjaxHandler):

    form = EventForm
    model = Event
