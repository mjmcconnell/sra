"""Form definitions, allow easy validation of input and rendering of forms
"""
# future imports
from __future__ import absolute_import

# third-party imports
from wtforms import FileField
from wtforms import SelectField
from wtforms import StringField
from wtforms import TextAreaField
from wtforms import validators

# local imports
from app.forms.base import SerialiserForm
from app.forms.utils.serialisers import ModelSerialiser
from app.forms.utils.validators import validate_image_format
from app.models.images import Image


class ImageForm(SerialiserForm):

    image = FileField(
        'Image',
        validators=[
            validators.DataRequired(),
            validate_image_format
        ],
    )
    layout = SelectField(
        'Image Layout',
        validators=[
            validators.DataRequired(),
        ],
        choices=[('square', 'Square'), ('tall', 'Tall'), ('wide', 'Wide')]
    )
    title = StringField(
        'Title',
        validators=[
            validators.DataRequired(),
        ],
    )
    description = TextAreaField(
        'Description',
        validators=[
            validators.DataRequired(),
        ],
    )

    class Serializer(ModelSerialiser):
        model = Image
        list_fields = [
            ('title', {
                'label': 'Title'
            }),
            ('layout', {
                'label': 'Layout'
            }),
            ('image_filename', {
                'label': 'Image',
                'type': 'link',
                'link_property': 'image_bucket_url',
            }),
            ('order', {
                'label': 'Order',
                'type': 'ordering',
            }),
        ]
