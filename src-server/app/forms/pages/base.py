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
    visible = BooleanField('Public')
    title = StringField(
        'Meta Title',
        validators=[validators.Optional()],
    )
    # Repeated value
    tags = StringField(
        'Meta Tags',
        description='This should be a comma seperated list of tags.',
    )
    nav = StringField(
        'Label for sidebar link',
        validators=[validators.Optional()],
    )
    description = TextAreaField('Meta Description')
    page__title = StringField(
        'Page Title',
        validators=[validators.Optional()],
    )
    page__sub_title = TextAreaField(
        'Page Copy',
        validators=[validators.Optional()],
    )

    class Serializer(ModelSerialiser):
        model = MetaData
        list_fields = [
            ('visible', {
                'type': 'visible',
            }),
            ('title', {
                'label': 'Meta Title'
            }),
            ('page.title', {
                'label': 'Page Title',
            }),
            ('order', {
                'label': 'Order',
                'type': 'ordering',
            }),
        ]
        fieldsets = [
            {
                'fields': (
                    'visible',
                ),
            },
            {
                'title': 'Page Content',
                'fields': (
                    'page__title',
                    'page__sub_title',
                ),
            },
            {
                'title': 'Sidebar',
                'fields': (
                    'nav',
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
        ]
