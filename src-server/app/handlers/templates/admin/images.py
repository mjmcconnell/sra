"""Base handlers for the application.
"""
# stdlib imports
import json

# local imports
from app.forms.images import ImageForm
from app.handlers.templates.admin.base import AdminTemplateHandler
from app.models.images import Image


class ImageHandler(AdminTemplateHandler):

    form = ImageForm()

    def render(self, template, template_data={}):

        template_data.update({
            'description': 'Manage all images on the gallery page',
            'fields': self.form.fields,
            'title': 'Images',
            'type': 'Images',
        })

        return super(ImageHandler, self).render(template, template_data)


class ListHandler(ImageHandler):

    def get(self):
        self.render('admin/list.html', {
            'json_records': json.dumps(Image.fetch_cached_dataset())
        })


class DetailHandler(ImageHandler):

    def get(self, id=None):
        if id:
            record = Image.get_by_id(int(id))

            if record is None:
                self.abort(404)

            self.form = ImageForm(None, record)

        self.render('admin/form.html', {
            'form': self.form,
            'json_record': json.dumps(record.to_dict())
        })
