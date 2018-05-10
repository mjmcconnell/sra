# thrid party imports
from jinja2 import evalcontextfilter, Markup


@evalcontextfilter
def nl2br(eval_ctx, value):
    """Replaces linebreaks with the html linebreak element.
    """
    if not value:
        return value

    result = value.replace('\n', '<br>')

    if eval_ctx.autoescape:
        result = Markup(result)
    return result
