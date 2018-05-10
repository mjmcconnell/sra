"""Api endpoints to interactions for the Page ndb model
"""
# local imports
from app.base.handlers import AdminAjaxHandler
from app.handlers.apis.mixins import ListMixin
from app.handlers.apis.mixins import OrderMixin
from app.handlers.apis.mixins import RetrieveMixin
from app.handlers.apis.mixins import UpdateMixin
from app.handlers.templates.admin.pages import get_form

from app.forms.pages.base import PageForm
from app.models.pages import MetaData


class AdminList(ListMixin, OrderMixin, AdminAjaxHandler):

    form = PageForm
    model = MetaData
    sort_order = 'order'


class AdminDetail(RetrieveMixin, UpdateMixin, AdminAjaxHandler):

    form = PageForm
    model = MetaData

    def post(self, _id):
        """Update an existing datastore record.
        """
        record = self._get_record()
        if record is None:
            self.response.set_status(400)
            return self.render_json({'message': 'Record not found'})

        self.form = get_form(record.page.kind())
        form = self._populate_form(self.request.POST, record)

        if form.validate():
            form = self._upload_images(form, record)
            record.update(form)

            return self.render_json({'data': record.to_dict()})

        self.response.set_status(400)
        return self.render_json({
            'message': 'Failed to update item',
            'data': form.errors
        })
