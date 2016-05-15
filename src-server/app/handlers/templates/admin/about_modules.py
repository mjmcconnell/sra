"""AboutModules handlers for the application.
"""
# stdlib imports
import json

# local imports
from app.forms.about_modules import AboutModuleForm
from app.handlers.templates.admin.base import AdminTemplateHandler
from app.models.about_modules import AboutModule


class AboutModuleHandler(AdminTemplateHandler):

    form = AboutModuleForm()

    def render(self, template, template_data={}):

        template_data.update({
            'description': 'Manage your about modules',
            'fields': self.form.fields,
            'title': 'About Modules',
            'type': 'about_modules',
        })

        return super(AboutModuleHandler, self).render(template, template_data)


class ListHandler(AboutModuleHandler):

    def get(self):
        self.render('admin/list.html', {
            'json_records': json.dumps(AboutModule.fetch_cached_dataset())
        })


class DetailHandler(AboutModuleHandler):

    def get(self, id=None):
        json_record = None
        if id:
            record = AboutModule.get_by_id(int(id))

            if record is None:
                self.abort(404)

            self.form = AboutModuleForm(None, record)
            json_record = json.dumps(record.to_dict())

        self.render('admin/form.html', {
            'form': self.form,
            'json_record': json_record
        })
