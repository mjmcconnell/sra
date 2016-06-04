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

    def _populate_form(self, data, record=None):
        if data.get('start'):
            data['start'] = data['start'][4:15]
        if data.get('end'):
            data['end'] = data['end'][4:15]

        return super(AdminList, self)._populate_form(data, record)


class AdminDetail(RetrieveUpdateDeleteMixin, AdminAjaxHandler):

    form = EventForm
    model = Event

    def _populate_form(self, data, record=None):
        if data.get('start'):
            data['start'] = data['start'][4:15]
        if data.get('end'):
            data['end'] = data['end'][4:15]

        return super(AdminDetail, self)._populate_form(data, record)
