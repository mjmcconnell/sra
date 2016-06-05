"""Handles the rendering of templates and model transactions for the front end.
"""
# stdlib imports
import json

# local imports
from app.base.handlers import BaseHandler
from app.models.about_modules import AboutModule
from app.models.events import Event
from app.models.pages import MetaData
from app.models.images import Image
from app.models.workshops import Workshop


class PublicTemplateHandler(BaseHandler):

    def render(self, tag, template, template_data=None):
        if template_data is None:
            template_data = {}

        template_data['pages'] = MetaData.group_by('tag')
        template_data['meta_data'] = template_data['pages'][tag]
        # Redirect user to the landing page if the page is not public
        if template_data['meta_data']['visible'] is False:
            return self.redirect_to('home')

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
        self.render('about', 'about.html', {
            'about_modules': AboutModule.fetch_cached_dataset()
        })


class EventsHandler(PublicTemplateHandler):

    def get(self, *args, **kwargs):
        self.render('events', 'events.html', {
            'events': Event.fetch_cached_dataset()
        })


class WorkshopsHandler(PublicTemplateHandler):

    def get(self, *args, **kwargs):
        self.render('workshops', 'workshops.html', {
            'workshops': Workshop.fetch_cached_dataset()
        })


class ContactHandler(PublicTemplateHandler):

    def get(self, *args, **kwargs):
        self.render('contact', 'contact.html')
