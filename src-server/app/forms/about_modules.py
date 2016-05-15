"""Form definitions, allow easy validation of input and rendering of forms
"""
# future imports
from __future__ import absolute_import

# third-party imports
from wtforms import StringField
from wtforms import TextAreaField
from wtforms import validators

# local imports
from app.forms.base import SerialiserForm
from app.forms.utils.serialisers import ModelSerialiser
from app.models.about_modules import AboutModule


class AboutModuleForm(SerialiserForm):

    title = StringField(
        'Title',
        validators=[
            validators.DataRequired(),
        ],
    )
    content = TextAreaField(
        'Content',
        validators=[
            validators.DataRequired(),
        ],
    )

    class Serializer(ModelSerialiser):
        model = AboutModule
        list_fields = [
            ('title', {
                'label': 'Title'
            }),
            ('order', {
                'label': 'Order',
                'type': 'ordering',
            }),
        ]
