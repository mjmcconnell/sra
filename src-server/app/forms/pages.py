"""Form definitions, allow easy validation of input and rendering of forms
"""
# future imports
from __future__ import absolute_import

# third-party imports
from wtforms import BooleanField
from wtforms import StringField
from wtforms import TextAreaField
from wtforms import validators

# local imports
from app.forms.base import SerialiserForm
from app.forms.utils.serialisers import ModelSerialiser
from app.models.pages import MetaData


class PageForm(SerialiserForm):
    """Stores meta data for each page.
    """
    visible = BooleanField(
        'Page is visible',
        description='This decides if the page will be viewable on the public facing site.',
    )
    title = StringField(
        'Title',
        validators=[validators.Optional()],
    )
    # Repeated value
    tags = StringField(
        'Tags',
        description='This should be a comma seperated list of tags.',
    )
    description = TextAreaField('Description')
    page__title = StringField(
        'Title',
        validators=[validators.Optional()],
    )
    page__copy = StringField(
        'Meta Title',
        validators=[validators.Optional()],
    )

    class Serializer(ModelSerialiser):
        model = MetaData
        list_fields = [
            ('visible', {
                'label': 'Public',
                'type': 'icon',
                'icon': 'visible'
            }),
            ('title', {
                'label': 'Meta Title'
            }),
            ('page__title', {
                'label': 'Page Title',
            }),
            ('order', {
                'label': 'Order',
                'type': 'ordering',
            }),
        ]
        field_sets = [
            {
                'fields': (
                    'visible',
                ),
            },
            {
                'title': 'Meta Data',
                'fields': (
                    'title',
                    'tags',
                    'description',
                ),
            },
            {
                'title': 'Page Content',
                'fields': (
                    'page__title',
                    'page__copy',
                ),
            },
        ]
