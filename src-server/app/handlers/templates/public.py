"""Handles the rendering of templates and model transactions for the front end.
"""
# local imports
from app.base.handlers import BaseHandler
from app.models.pages import MetaData


class HomeHandler(BaseHandler):

    def get(self, *args, **kwargs):
        pages = MetaData.fetch_cached_dataset()
        tagged_pages = {}
        for p in pages:
            tagged_pages.update({p['tag']: p})
        self.render('home.html', {'pages': tagged_pages})
