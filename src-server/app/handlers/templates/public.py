"""Handles the rendering of templates and model transactions for the front end.
"""
# stdlib imports
import json

# local imports
from app.base.handlers import BaseHandler
from app.models.pages import MetaData
from app.models.images import Image


class PublicTemplateHandler(BaseHandler):

    def render(self, tag, template, template_data=None):
        if template_data is None:
            template_data = {}

        template_data['pages'] = MetaData.group_by('tag')
        template_data['page'] = template_data['pages'][tag]['page']

        super(PublicTemplateHandler, self).render(template, template_data)


class HomeHandler(PublicTemplateHandler):

    def get(self, *args, **kwargs):
        self.render('home', 'home.html')


class GalleryHandler(PublicTemplateHandler):

    def get(self, *args, **kwargs):
        self.render('gallery', 'gallery.html', {
            'json_images': json.dumps(Image.fetch_cached_dataset())
        })


class AboutHandler(PublicTemplateHandler):

    def get(self, *args, **kwargs):
        self.render('about', 'about.html')


class EventsHandler(PublicTemplateHandler):

    def get(self, *args, **kwargs):
        self.render('events', 'events.html')


class NewsHandler(PublicTemplateHandler):

    def get(self, *args, **kwargs):
        self.render('news', 'news.html')


class ContactHandler(PublicTemplateHandler):

    def get(self, *args, **kwargs):
        self.render('contact', 'contact.html')
