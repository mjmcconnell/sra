"""Base serialisers for forms
"""


class ModelSerialiser(object):
    """Base serialiser for modals
    """

    model = None

    @classmethod
    def get_queryset(cls):
        return cls.model.query()
