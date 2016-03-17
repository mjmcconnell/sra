"""Base handlers for the application.
"""
# third-party imports
from google.appengine.api import users
from webapp2_extras import sessions

# local imports
from app.base import handlers


class AdminTemplateHandler(handlers.AdminHandler):
    """Some core functionality for all template handlers,
    that require admin level access.
    """

    def post(self, *args, **kwargs):
        """Captures post requests and serves them to the get function.
        This reduces duplication of code between the get and post methods.
        """
        return self.get(*args, **kwargs)

    def DenyAccess(self):
        """If user is not permitted to access url,
        then redirect them to the login screen,
        with forwarding to return to requested page.
        """
        return self.redirect(users.create_login_url(self.request.url))

    def XsrfFail(self):
        """Flags invalid xsrf tokkens
        """
        self.session_store = sessions.get_store(request=self.request)
        self.session.add_flash('XSRF Fail', level='danger')
        try:
            self.redirect(self.request.url)
        finally:
            self.session_store.save_sessions(self.response)


class AdminAjaxHandler(handlers.AdminAjaxHandler):

    def DenyAccess(self):
        self.response.set_status(403)
        self.render_json({
            'error': 'You are not authorised to access that location.'
        })

    def XsrfFail(self):
        self.response.set_status(400)
        self.render_json({'error': 'XSRF Fail'})
