"""Handles the rendering of templates and model transactions for the front end.
"""
# local imports
from app.base.handlers import BaseHandler


class HomeHandler(BaseHandler):

    def get(self):
        self.render('home.html')
