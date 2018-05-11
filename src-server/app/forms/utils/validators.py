"""Additional form validators
"""
# future imports
from __future__ import absolute_import

# stdlib import
import re
from StringIO import StringIO

# third-party imports
from wtforms import ValidationError
from wtforms import validators


# Pulled from http://www.regular-expressions.info/email.html
email_re = re.compile(
    r"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*"
    r"@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
    re.IGNORECASE
)


def validate_email_address(form, field):
    """Validate a string email address against the email regex
    """
    if (not isinstance(field.data, basestring) or
            not email_re.search(field.data)):

        raise ValidationError('Not a valid email address.')


def validate_image_format(form, field):
    """Use PIL to inspect an image, to see its format type.
    """
    pass


def validate_image_size(width=None, height=None):

    def _validate_image_size(form, field):
        pass

    return _validate_image_size


class RequiredIf(validators.Required):
    """A validator which makes a field required if
    another field is set and has a truthy value.
    """

    other_field_name = None
    exta_validators = []

    def __init__(self, other_field_name, *args, **kwargs):
        self.other_field_name = other_field_name
        self.exta_validators = args
        super(RequiredIf, self).__init__(*args, **kwargs)

    def __call__(self, form, field):
        other_field = form._fields.get(self.other_field_name)
        if other_field is None:
            raise Exception(
                'no field named "%s" in form' % self.other_field_name)
        if bool(other_field.data):
            super(RequiredIf, self).__call__(form, field)

            for val in self.exta_validators:
                val.__call__(form, field)
