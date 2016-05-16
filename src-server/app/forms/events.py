"""Form definitions, allow easy validation of input and rendering of forms
"""
# future imports
from __future__ import absolute_import

# third-party imports
from wtforms import DateField
from wtforms import FileField
from wtforms import StringField
from wtforms import TextAreaField
from wtforms import validators

# local imports
from app.forms.base import SerialiserForm
from app.forms.utils.serialisers import ModelSerialiser
from app.forms.utils.validators import validate_image_format
# from app.forms.utils.validators import validate_image_size
from app.models.images import Image


class EventForm(SerialiserForm):

    start = DateField(
        'Start',
        validators=[
            validators.DataRequired(),
        ],
    )
    end = DateField('End')
    time = StringField('Time')
    image = FileField(
        'Image',
        validators=[
            validators.Optional(),
            validate_image_format,
            # validate_image_size(420, 330)
        ],
    )
    title = StringField(
        'Title',
        validators=[
            validators.DataRequired(),
        ],
    )
    content = TextAreaField('Description')
    link_label = StringField(
        'Link Title',
        validators=[
            validators.DataRequired(),
        ],
    )
    link_url = StringField(
        'Link URL',
        validators=[
            validators.DataRequired(),
        ],
    )

    class Serializer(ModelSerialiser):
        model = Image
        list_fields = [
            ('image_bucket_url', {
                'label': 'Thumbnail',
                'type': 'image',
            }),
            ('title', {
                'label': 'Title'
            }),
            ('order', {
                'label': 'Order',
                'type': 'ordering',
            }),
        ]
