"""Generic admin api method used for altering records in the datastore.
"""
# stdlib imports
import logging
import json
import os
import re

# local imports
from app.handlers.base import BaseAjaxHandler
from app.utils import storage


class BaseAjaxHandler(BaseAjaxHandler):

    model = None
    id_hint = int

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
            logging.debug('Invalid ID (Unable to coerce): %s', _id)
        else:
            return self.model.get_by_id(_id)

        return None


class ApiListHandler(BaseAjaxHandler):

    def get(self, *args, **kwargs):
        return_data = self.model.fetch_cached_dataset(**kwargs)
        return self.render_json(return_data)


class ApiDetailHandler(BaseAjaxHandler):

    def get(self, _id, *args, **kwargs):
        return_data = self._get_record(_id).to_dict()
        return self.render_json(return_data)

    def post(self, _id=None, *args, **kwargs):
        """Save form data to the datastore
        """
        return_data = {}
        record = self._get_record(_id)
        if _id and record is None:
            self.response.set_status(400)
            return_data['status'] = 'fail'
            return_data['message'] = 'Record could not be found.'
            return self.render_json(return_data)
        elif _id is None and record:
            _id = record.key.id()

        # Save the form data to the datastore
        self.form = self.populate_form(record)
        saved, msg = self.save_form(_id, record)

        if saved:
            return_data['status'] = 'success'
            return_data['data'] = self.redirect_url
            self.session.add_flash(msg, level='success')
        else:
            return_data['status'] = 'fail'
            return_data['message'] = msg
            return_data['data'] = self.form.errors
            self.response.set_status(400)

        return self.render_json(return_data)

    def get_queryset(self):
        """Fetch the associated record, if "_id" is set."""

        _id = self.request.route_kwargs.get('_id')
        if _id:
            return self.model.get_by_id(int(_id), parent=self.parent_key)
        return None

    def populate_form(self, record):
        """Populate the form."""

        return self.form(self.request.POST, record)

    def save_form(self, _id, record):
        """Save form data to the datastore.
        Handles form submission and file uploads.
        """
        file_upload = False
        msg = 'Record could not be saved to datastore, please try again.'
        new_image_files = {}
        org_image = None

        for field in self.form:
            if 'image_url' in field.name:
                # Grab the original values from the datastore record.
                if record:
                    org_image = getattr(record, field.name)

                # Check if the image field is populated
                if hasattr(field.data, 'filename'):
                    file_upload = True
                    filename_handle = field.name.replace('image_url', '')
                    # to preform cleanup on the filename
                    filename, ext = os.path.splitext(field.data.filename)
                    # Remove all non word chars from the filename
                    clean_filename = re.sub(r'\W', '', filename)
                    # join everything together
                    clean_filename = filename_handle + clean_filename + ext
                    new_image_files.update({field.name: {
                        'filename': clean_filename,
                        'value': field.data.value
                    }})
                    # Update the form field Filestorage data with the
                    # cleaned filename
                    field.data = clean_filename
                # If the field is not set, then try to use the records value
                # to populate the field.
                elif record:
                    field.data = org_image

        if self.form.validate():
            record = self.model.create_or_update(
                self.form, self.parent_key, _id)
            if record:
                # If an image was set in the form, then we upload
                # the image into the google cloud storage.
                if file_upload:
                    for field_name, new_image in new_image_files.iteritems():
                        bucket_url = record.build_bucket_url(
                            new_image['filename']
                        )
                        # Upload the image to the googe cloud storage bucket
                        storage.store_file(
                            bucket_url,
                            new_image['value'],
                            storage.get_mimetype_for_filename(bucket_url)
                        )

                msg = '{0} {1}'.format(
                    self.model.__name__,
                    ('added', 'edited')[int(bool(_id))],
                )
                return True, msg
        else:
            msg = 'There are errors on your form, please correct these, \
                before trying to submit the form again.'

        return False, msg


class ApiDeleteHandler(BaseAjaxHandler):
    """Removes a given record from the datastore
    """

    def post(self, *args, **kwargs):
        """Update the records position field.
        """
        record = self._get_record()
        if record is None:
            self.response.set_status(400)
            return self.render_json({'msg': 'Record not found'})

        return record.key.delete()


class ApiPositionHandler(BaseAjaxHandler):
    """Updates the position of each models record in the datastore

    Expects a list of objects with an "id" attribrute indicating the record id
    """

    def post(self, *args, **kwargs):
        """Update the records position field.
        """
        post_data = self.request.POST
        for i, _id in enumerate(json.loads((post_data['ids']))):
            record = self._get_record(_id)
            setattr(record, 'order', i)
            record.put()
