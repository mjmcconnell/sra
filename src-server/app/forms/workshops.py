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
        format='%b %d %Y',
        validators=[
            validators.DataRequired(),
        ],
    )
    end = DateField(
        'End',
        format='%b %d %Y',
        validators=[
            validators.DataRequired(),
        ],
    )
    time = StringField(
        'Time',
        validators=[
            validators.DataRequired(),
        ],
    )
    location = TextAreaField(
        'Location',
        validators=[
            validators.DataRequired(),
        ],
    )
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
    short_copy = TextAreaField(
        'Short Description',
        description="Shown on the card"
    )
    content = TextAreaField(
        'Description',
        description="Shown on the popup dialog"
    )
    signup_cta_label = StringField(
        'Label',
        validators=[
            validators.DataRequired(),
        ],
    )
    signup_cta_url = StringField('URL')
    link_label = StringField('Title')
    link_url = StringField('URL')

    class Serializer(ModelSerialiser):
        model = Image
        list_fields = [
            ('title', {
                'label': 'Title'
            }),
            ('start', {
                'label': 'Start'
            }),
            ('end', {
                'label': 'End'
            }),
            ('location', {
                'label': 'Location'
            }),
            ('order', {
                'label': 'Order',
                'type': 'ordering',
            }),
        ]
        fieldsets = [
            {
                'title': 'Key Info',
                'fields': (
                    'start',
                    'end',
                    'time',
                    'location',
                ),
            },
            {
                'title': 'Content',
                'fields': (
                    'image',
                    'title',
                    'short_copy',
                    'content',
                ),
            },
            {
                'title': 'Form CTA',
                'fields': (
                    'signup_cta_label',
                    'signup_cta_url',
                ),
            },
            {
                'title': 'External Link',
                'fields': (
                    'link_label',
                    'link_url',
                ),
            },
        ]
