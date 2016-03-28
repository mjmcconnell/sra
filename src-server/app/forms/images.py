"""Form definitions, allow easy validation of input and rendering of forms
"""
# future imports
from __future__ import absolute_import

# third-party imports
from wtforms import Form
from wtforms import FileField
from wtforms import StringField
from wtforms import TextAreaField
from wtforms import validators

# local imports
from .utils.validators import validate_image_format


class ImageForm(Form):

    image = FileField(
        'Image',
        validators=[
            validators.DataRequired(),
            validate_image_format
        ],
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
