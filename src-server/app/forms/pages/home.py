"""Form definitions, allow easy validation of input and rendering of forms
"""
# future imports
from __future__ import absolute_import

# third-party imports
from wtforms import FileField
from wtforms import StringField
from wtforms import TextAreaField
from wtforms import validators

# local imports
from app.forms.pages.base import PageForm
from app.forms.utils.serialisers import ModelSerialiser
from app.forms.utils.validators import validate_image_format
# from app.forms.utils.validators import validate_image_size
from app.models.pages import MetaData


class HomePageForm(PageForm):

    page__gallery_title = StringField(
        'Gallery Title',
        validators=[
            validators.DataRequired(),
        ],
    )
    page__gallery_copy = TextAreaField(
        'Gallery Copy',
        validators=[
            validators.Optional(),
        ],
    )
    page__gallery_cta_label = StringField(
        'Gallery CTA Label',
        validators=[
            validators.DataRequired(),
        ],
    )
    page__gallery_cta_url = StringField(
        'Gallery CTA URL',
        validators=[
            validators.DataRequired(),
        ],
    )
    page__gallery_image = FileField(
        'Gallery Image',
        validators=[
            validators.Optional(),
            validate_image_format,
            # validate_image_size(),
        ],
    )

    page__events_title = StringField(
        'Events Title',
        validators=[
            validators.DataRequired(),
        ],
    )
    page__events_copy = TextAreaField(
        'Events Copy',
        validators=[
            validators.Optional(),
        ],
    )
    page__events_image = FileField(
        'Events Image',
        validators=[
            validators.Optional(),
            validate_image_format,
            # validate_image_size(),
        ],
    )
    page__events_cta_label = StringField(
        'Events CTA Label',
        validators=[
            validators.DataRequired(),
        ],
    )
    page__events_cta_url = StringField(
        'Events CTA URL',
        validators=[
            validators.DataRequired(),
        ],
    )

    class Serializer(ModelSerialiser):
        model = MetaData
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
                'title': 'Gallery Module',
                'fields': (
                    'page__gallery_title',
                    'page__gallery_copy',
                    'page__gallery_image',
                    'page__gallery_cta_label',
                    'page__gallery_cta_url',
                ),
            },
            {
                'title': 'Events Module',
                'fields': (
                    'page__events_title',
                    'page__events_copy',
                    'page__events_image',
                    'page__events_cta_label',
                    'page__events_cta_url',
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