"""Handles the rendering of templates and model transactions for the front end.
"""
# local imports
from app.base.handlers import BaseHandler


class HomeHandler(BaseHandler):

    def get(self):
        self.render('home.html')


class GalleryHandler(BaseHandler):

    def get(self):
        self.render('gallery.html')


class ContactHandler(BaseHandler):

    def get(self):
        self.render('contact.html')
