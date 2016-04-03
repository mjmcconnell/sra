"""Form definitions, allow easy validation of input and rendering of forms
"""
# future imports
from __future__ import absolute_import

# third-party imports
from wtforms import Form


class SerialiserForm(Form):

    def __init__(self, *args, **kwargs):
        super(SerialiserForm, self).__init__(*args, **kwargs)

        self.serialiser = self.Serializer()
