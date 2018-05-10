"""Api endpoints to interactions for the Image ndb model
"""
# third-party imports
from google.appengine.api import mail

# local imports
from app import config
from app.base.handlers import BaseAjaxHandler
from app.base.handlers import AdminAjaxHandler
from app.handlers.apis.mixins import ListCreateMixin
from app.handlers.apis.mixins import OrderMixin
from app.handlers.apis.mixins import RetrieveUpdateDeleteMixin

from app.forms.workshops import WorkshopForm
from app.forms.workshops import WorkshopContactForm
from app.models.workshops import Workshop


class AdminList(ListCreateMixin, OrderMixin, AdminAjaxHandler):

    form = WorkshopForm
    model = Workshop
    sort_order = 'order'

    def _populate_form(self, data, record=None):
        if data.get('start'):
            data['start'] = data['start'][4:15]
        if data.get('end'):
            data['end'] = data['end'][4:15]

        return super(AdminList, self)._populate_form(data, record)


class AdminDetail(RetrieveUpdateDeleteMixin, AdminAjaxHandler):

    form = WorkshopForm
    model = Workshop

    def _populate_form(self, data, record=None):
        if data.get('start'):
            data['start'] = data['start'][4:15]
        if data.get('end'):
            data['end'] = data['end'][4:15]

        return super(AdminDetail, self)._populate_form(data, record)


class ContactHandler(BaseAjaxHandler):
    """Handles the form submission from the frontend contact page.
    """

    def post(self):
        """Validate the form data, if successful send of the email
        returning a successful json response with the submitted data.
        Else return a failed json response with the form errors.
        """
        code = 200
        return_data = {}
        form = WorkshopContactForm(self.request.POST)

        if form.validate():
            # Render the user generated content using jinja2,
            # to enable auto-escaping
            template_data = {
                'title': 'Someone has made an enquiry about the workshops.',
                'form': form
            }

            mail.send_mail(
                sender='workshops@{}.appspotmail.com'.format(config.APP_ID),
                to=config.EMAIL_TO,
                subject='Workshops enquiry',
                body=self.render_to_string('emails/form.txt', template_data),
                html=self.render_to_string('emails/form.html', template_data)
            )
            return_data['status'] = 'success'
        else:
            code = 400
            return_data['status'] = 'fail'
            return_data['data'] = form.errors

        self.response.set_status(code)
        return self.render_json(return_data)
