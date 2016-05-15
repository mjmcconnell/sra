"""Base handlers for the application.
"""
# stdlib imports
import json

# local imports
from app.forms.pages.about import AboutPageForm
from app.forms.pages.base import PageForm
from app.forms.pages.events import EventsPageForm
from app.forms.pages.gallery import GalleryPageForm
from app.forms.pages.news import NewsPageForm
from app.forms.pages.home import HomePageForm
from app.handlers.templates.admin.base import AdminTemplateHandler
from app.models.pages import MetaData


def get_form(model_kind):

    forms = {
        'AboutPage': AboutPageForm,
        'EventsPage': EventsPageForm,
        'GalleryPage': GalleryPageForm,
        'NewsPage': NewsPageForm,
        'HomePage': HomePageForm,
    }

    return forms.get(model_kind)


class PageHandler(AdminTemplateHandler):

    form = PageForm()

    def render(self, template, template_data={}):

        template_data.update({
            'description': 'Manage the content of the site',
            'fields': self.form.fields,
            'title': 'Pages',
            'type': 'Pages',
        })

        return super(PageHandler, self).render(template, template_data)


class ListHandler(PageHandler):

    def get(self):
        self.render('admin/list.html', {
            'json_records': json.dumps(MetaData.fetch_cached_dataset())
        })


class DetailHandler(PageHandler):

    def get(self, id):
        record = MetaData.get_by_id(int(id))

        if record is None:
            self.abort(404)

        form = get_form(record.page.kind())
        form = form(None, record)

        self.render('admin/form.html', {
            'form': self.form,
            'json_record': json.dumps(record.to_dict())
        })
