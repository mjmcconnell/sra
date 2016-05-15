"""Event handlers for the application.
"""
# stdlib imports
import json

# local imports
from app.forms.events import EventForm
from app.handlers.templates.admin.base import AdminTemplateHandler
from app.models.events import Event


class EventHandler(AdminTemplateHandler):

    form = EventForm()

    def render(self, template, template_data={}):

        template_data.update({
            'description': 'Manage your events',
            'fields': self.form.fields,
            'title': 'Events',
            'type': 'Events',
        })

        return super(EventHandler, self).render(template, template_data)


class ListHandler(EventHandler):

    def get(self):
        self.render('admin/list.html', {
            'json_records': json.dumps(Event.fetch_cached_dataset())
        })


class DetailHandler(EventHandler):

    def get(self, id=None):
        json_record = None
        if id:
            record = Event.get_by_id(int(id))

            if record is None:
                self.abort(404)

            self.form = EventForm(None, record)
            json_record = json.dumps(record.to_dict())

        self.render('admin/form.html', {
            'form': self.form,
            'json_record': json_record
        })
