"""Additional form validators
"""
# future imports
from __future__ import absolute_import

# stdlib import
import re

# third-party imports
from PIL import Image
from StringIO import StringIO
from wtforms import ValidationError
from wtforms import validators


# Pulled from http://www.regular-expressions.info/email.html
email_re = re.compile(
    r"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*"
    r"@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
    re.IGNORECASE
)

bcp47_re = re.compile(
    r"^(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}"
    r"|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?"
    r"(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z]"
    r"(-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]"
    r"{1,8})+)|((en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon"
    r"|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|"
    r"sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|"
    r"zh-min|zh-min-nan|zh-xiang)))$"
)

slug_re = exp = re.compile(r'^[\w\-]+$')


GITKIT_LANGUAGE_OPTIONS = [
    'fa',       #Persian
    'ar',       #Arabic
    'zh_cn',    #Chinese (Simplified, Mandarin)
    'zh_tw',    #Chinese (Traditional, Mandarin)
    'es_419',   #Spanish (Latin American)
    'iw',       #Hebrew
    'bg',       #Bulgarian
    'hr',       #Croatian
    'cs',       #Czech
    'da',       #Danish
    'nl',       #Dutch
    'en',       #English (UK)
    'en',       #English (US)
    'fi',       #Finnish
    'fr',       #French
    'de',       #German
    'el',       #Greek
    'hi',       #Hindi
    'hu',       #Hungarian
    'id',       #Indonesian
    'it',       #Italian
    'ja',       #Japanese
    'ko',       #Korean
    'lv',       #Latvian
    'lt',       #Lithuanian
    'no',       #Norwegian
    'pl',       #Polish
    'pt',       #Portuguese (Brazil)
    'pt_pt',    #Portuguese (Portugal)
    'ro',       #Romanian
    'ru',       #Russian
    'sr',       #Serbian
    'sk',       #Slovak
    'sl',       #Slovenian
    'es',       #Spanish
    'sv',       #Swedish
    'th',       #Thai
    'tr',       #Turkish
    'uk',       #Ukrainian
    'vi',       #Vietnamese
]


def validate_bcp47_code(form, field):
    """Validate a string code against the bcp47 regex
    """
    if (not isinstance(field.data, basestring) or
            not bcp47_re.search(field.data)):

        raise ValidationError('Not a valid BCP47 code.')


def validate_email_address(form, field):
    """Validate a string email address against the email regex
    """
    if (not isinstance(field.data, basestring) or
            not email_re.search(field.data)):

        raise ValidationError('Not a valid email address.')


def validate_image_format(form, field):
    """Use PIL to inspect an image, to see its format type.
    """
    valid_formats = ['JPG', 'JPEG', 'PNG']

    if len(field.raw_data):
        if hasattr(field.raw_data[0], 'filename'):
            try:
                i = Image.open(StringIO(field.raw_data[0].value))
                if i.format not in valid_formats:
                    raise ValidationError('Invalid image provided.')
            except IOError:
                raise ValidationError('Invalid image format found.')


def validate_image_size(width=None, height=None):

    def _validate_image_size(form, field):
        if len(field.raw_data):
            if hasattr(field.raw_data[0], 'filename'):
                try:
                    i = Image.open(StringIO(field.raw_data[0].value))
                    if (width and height) and ((width, height) != i.size):
                        raise ValidationError(
                            'Image must be {}x{}, found {}x{}.'.format(
                                width,
                                height,
                                i.size[0],
                                i.size[1]
                            )
                        )
                    elif width and width != i.size[0]:
                        raise ValidationError(
                            'Image must be {}px in width, found {}px.'.format(
                                width,
                                i.size[0]
                            )
                        )
                    elif height and height != i.size[1]:
                        raise ValidationError(
                            'Image must be {}px in height, found {}px.'.format(
                                height,
                                i.size[1]
                            )
                        )
                except IOError:
                    raise ValidationError('Invalid image format found.')

    return _validate_image_size


def validate_gitkit_choice(form, field):
    """Ensure language code is valid and available.
    """
    if field.data and field.data not in GITKIT_LANGUAGE_OPTIONS:
        raise ValidationError('Invalid language code found.')


def valid_slug(form, field):
    """Validate a slug against the re_regex
    """
    if field.data and not slug_re.search(field.data):
        raise ValidationError('Invalid characters found in slug.')


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
            raise Exception('no field named "%s" in form' % self.other_field_name)
        if bool(other_field.data):
            super(RequiredIf, self).__call__(form, field)

            for val in self.exta_validators:
                val.__call__(form, field)
