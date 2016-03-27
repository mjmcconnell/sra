"""Base handlers for the application.
"""
# local imports
from app.base import handlers


class AdminAjaxHandler(handlers.AdminAjaxHandler):

    def DenyAccess(self):
        self.response.set_status(403)
        self.render_json({
            'error': 'You are not authorised to access that location.'
        })

    def XsrfFail(self):
        self.response.set_status(400)
        self.render_json({'error': 'XSRF Fail'})
