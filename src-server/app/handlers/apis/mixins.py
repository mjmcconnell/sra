"""Template handlers, for injecting python into html templates.
"""
# stdlib imports
import json
import logging
import os
import re

# local imports
from app.utils import storage

# third-party imports
from google.appengine.ext import ndb


logger = logging.getLogger(__name__)


class BaseMixin(object):
    """Class for common mixin functionality
    """

    form = None
    id_hint = int
    model = None
    new_image_files = []

    def DenyAccess(self):
        """Handler for returning a 403 response for unauthenticated requests,
        to protected endpoints
        """
        self.response.set_status(403)
        self.render_json({
            'message': 'You are not authorised to access that location.'
        })

    def XsrfFail(self):
        """Post requests that do not contain valid xsrf tokens will
        return a 400 response
        """
        self.response.set_status(400)
        self.render_json({'message': 'XSRF Fail'})

    def _get_record(self, _id=None):
        """Fetches a record with an ID for the active model.
        If no ID is passed in, then it tries to find one from the request.
        The _hint variable forces the ID's type
        """
        if _id is None:
            _id = self.request.route_kwargs.get('_id')

        try:
            _id = self.id_hint(_id)
        except (TypeError, ValueError):
            logging.debug('Invalid ID (Unable to coerce): {0}'.format(_id))
        else:
            return self.model.get_by_id(int(_id))

        return None

    def _populate_form(self, data, record=None):
        """Populates a wtform with data
        """
        self.form = self.form(data, record)
        if record:
            flat_record = record.to_dict(flatten=True)

        for k, v in data.iteritems():
            if k.endswith('image'):
                # Check if the image field is populated
                if hasattr(v, 'filename'):
                    # to preform cleanup on the filename
                    filename, ext = os.path.splitext(v.filename)
                    # Remove all non word chars from the filename
                    c_filename = re.sub(r'\W', '', filename)
                    # join everything together
                    c_filename = c_filename + ext
                    path = self.model.generate_bucket_url(c_filename)
                    self.new_image_files.append({
                        'filename': path,
                        'minetype': v.type,
                        'value': v.file.read()
                    })
                    # Update the form field Filestorage data with the
                    # cleaned filename
                    v = path
                # If the field is not set, then try to use the records value
                # to populate the field.
                elif record:
                    v = flat_record[k]
                try:
                    setattr(getattr(self.form, k), 'data', v)
                except AttributeError:
                    pass

        return self.form

    def _upload_images(self, form, record=None):
        for new_image in self.new_image_files:
            # Upload the image to the googe cloud storage bucket
            storage.store_file(
                filename=new_image['filename'],
                data=new_image['value'],
                mimetype=new_image['minetype']
            )

        return form


class ListMixin(BaseMixin):

    sort_order = None

    def get(self):
        """Retrieve record/s from the datastore for a given model.
        """
        records = self.model.fetch_cached_dataset()
        return self.render_json({
            'count': len(records),
            'data': records
        })


class CreateMixin(BaseMixin):

    def post(self):
        """Create a new datastore record.
        """
        form = self._populate_form(self.request.POST)
        if form.validate():
            form = self._upload_images(form)
            record = self.model.create(form)
            return self.render_json({'data': record.to_dict()})

        self.response.set_status(400)
        return self.render_json({
            'message': 'Failed to create item',
            'data': form.errors
        })


class ListCreateMixin(ListMixin, CreateMixin):
    """
    """

    pass


class RetrieveMixin(BaseMixin):

    def get(self, _id):
        """Update an existing datastore record.
        """
        record = self._get_record()
        if record is None:
            self.response.set_status(400)
            return self.render_json({'message': 'Record not found'})

        return self.render_json({'data': record.to_dict()})


class UpdateMixin(BaseMixin):

    def post(self, _id):
        """Update an existing datastore record.
        """
        record = self._get_record()
        if record is None:
            self.response.set_status(400)
            return self.render_json({'message': 'Record not found'})

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


class DeleteMixin(BaseMixin):

    def delete(self, _id):
        """Remove a record from the datastore.
        """
        key = ndb.Key(self.model, int(_id))
        record = key.get()
        if record is None:
            self.response.set_status(400)
            return self.render_json({'message': 'Record not found'})

        key.delete()


class RetrieveUpdateDeleteMixin(RetrieveMixin, UpdateMixin, DeleteMixin):

    pass


class OrderMixin(BaseMixin):
    """Updates the position of each models record in the datastore

    Expects a list of objects with an "id" attribrute indicating the record id
    """

    def put(self, *args, **kwargs):
        """Update the records position field.
        """
        post_data = self.request.POST
        for data in json.loads((post_data['ids'])):
            record = self._get_record(data['id'])
            record.order = int(data['order'])
            record.put()
