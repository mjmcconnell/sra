"""API Handlers.
"""
# third-party imports
from google.appengine.api import mail

# local imports
from app.base.handlers import BaseAjaxHandler
from app import config
from app.forms.contacts import ContactForm


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
        form = ContactForm(self.request.POST)

        if form.validate():
            # Render the user generated content using jinja2,
            # to enable auto-escaping
            mail.send_mail(
                sender='contact@{}.appspotmail.com'.format(config.APP_ID),
                to=config.EMAIL_TO,
                subject=self.jinja2.from_string(
                    '{{ form.subject.data }}').render({'form': form}),
                body=self.render_to_string('emails/form.html', {'form': form})
            )
            return_data['status'] = 'success'
        else:
            code = 400
            return_data['status'] = 'fail'
            return_data['data'] = form.errors

        self.response.set_status(code)
        return self.render_json(return_data)
