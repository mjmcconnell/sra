"""Form definitions, allow easy validation of input and rendering of forms
"""
# future imports
from __future__ import absolute_import

# third-party imports
from wtforms import Form
from wtforms import StringField
from wtforms import TextAreaField
from wtforms import validators

# local imports
from .utils.validators import validate_email_address


class ContactForm(Form):

    subject = StringField('Subject')
    name = StringField(
        'Name',
        validators=[
            validators.DataRequired(),
        ],
    )
    email = StringField(
        'Email',
        validators=[
            validators.DataRequired(),
            validate_email_address,
        ],
    )
    message = TextAreaField(
        'Message',
        validators=[
            validators.DataRequired(),
        ],
    )
