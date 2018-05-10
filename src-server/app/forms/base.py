"""Form definitions, allow easy validation of input and rendering of forms
"""
# future imports
from __future__ import absolute_import

# third-party imports
from wtforms import Form


class SerialiserForm(Form):

    fields = []
    fieldsets = []
    serialiser = None

    def __init__(self, *args, **kwargs):
        super(SerialiserForm, self).__init__(*args, **kwargs)

        fieldnames = [f.name for f in self]

        self.serialiser = self.Serializer()

        if hasattr(self.serialiser, 'list_fields'):
            self.fields = self.serialiser.list_fields
        else:
            for name in fieldnames:
                self.fields.append((name, {'label': name}))

        if hasattr(self.serialiser, 'fieldsets'):
            self.fieldsets = self.serialiser.fieldsets
        else:
            self.fieldsets = [{
                'title': self.serialiser.model.__name__,
                'fields': fieldnames
            }]
