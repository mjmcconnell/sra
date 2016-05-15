"""Form definitions, allow easy validation of input and rendering of forms
"""
# future imports
from __future__ import absolute_import

# third-party imports
from wtforms import TextAreaField
from wtforms import validators

# local imports
from app.forms.pages.base import PageForm


class AboutPageForm(PageForm):

    content = TextAreaField(
        'Content',
        validators=[validators.Required()],
    )
