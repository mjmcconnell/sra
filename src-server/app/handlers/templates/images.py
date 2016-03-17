"""Handles the rendering of templates and model transactions for the front end.
"""
# local imports
from app.handlers.templates.admin import AdminTemplateHandler


class ImageHandler(AdminTemplateHandler):

    def get(self):
        self.render('cms/list.html', {'items': {}})
