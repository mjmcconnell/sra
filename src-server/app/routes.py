"""Route/URL definitions for the app"""
# stdlib imports
import itertools

# third-party imports
from webapp2 import Route
from webapp2_extras.routes import HandlerPrefixRoute
from webapp2_extras.routes import RedirectRoute

# local imports
from app.utils.routes import MultiPrefixRoute


# These should all inherit from base.handlers.BaseHandler
_UNAUTHENTICATED_ROUTES = [
    HandlerPrefixRoute('app.handlers.templates.public.', [
        Route(r'/', 'HomeHandler', name='home'),
        Route(r'/gallery', 'GalleryHandler', name='gallery'),
        Route(r'/contact', 'ContactHandler', name='contact'),
        # Route(r'/about', 'AboutHandler', name='about'),
        # Route(r'/events', 'EventsHandler', name='events'),
        # Route(r'/news', 'NewsHandler', name='news'),
        Route(r'/<path:.*>', 'HomeHandler', name='home-all'),
    ]),
]

# These should all inherit from base.handlers.BaseAjaxHandler
_UNAUTHENTICATED_AJAX_ROUTES = MultiPrefixRoute(
    handler_pfx='app.handlers.apis.',
    name_pfx='api-',
    path_pfx='/api',
    routes=[
        Route(r'/contact', 'mail.ContactHandler', name='contact'),
        Route(r'/images', 'images.PublicImageList', name='images'),
        Route(r'/meta_data', 'images.PublicMetaDataList', name='meta_data'),
        Route(r'/pages', 'images.PublicPageList', name='pages'),
    ]
).routes
# These should all inherit from base.handlers.AuthenticatedHandler
_USER_ROUTES = []

# These should all inherit from base.handlers.AuthenticatedAjaxHandler
_AJAX_ROUTES = []

# These should all inherit from base.handlers.AdminHandler
_ADMIN_ROUTES = [
    RedirectRoute(r'/admin', redirect_to_name='admin-pages-list'),
    RedirectRoute(r'/admin/', redirect_to_name='admin-pages-list'),
]

_ADMIN_ROUTES = _ADMIN_ROUTES + MultiPrefixRoute(
    handler_pfx='app.handlers.templates.admin.',
    name_pfx='admin-',
    path_pfx='/admin',
    routes=[
        Route(r'/images', 'ImageHandler', name='images-list'),
        Route(r'/pages', 'PageHandler', name='pages-list'),
    ]
).routes

# These should all inherit from base.handlers.AdminAjaxHandler
_ADMIN_AJAX_ROUTES = MultiPrefixRoute(
    handler_pfx='app.handlers.apis.',
    name_pfx='admin-api-',
    path_pfx='/api/admin',
    routes=[
        Route(
            r'/images',
            'images.AdminImageList',
            methods=['GET', 'POST', 'PUT'],
            name='images-list'
        ),
        Route(
            r'/images/<_id:\d+>',
            'images.AdminImageDetail',
            methods=['GET', 'POST', 'DELETE'],
            name='images-detail'
        ),
        Route(
            r'/pages',
            'pages.AdminPageList',
            methods=['GET', 'PUT'],
            name='pages-list'
        ),
        Route(
            r'/pages/<_id:\d+>',
            'pages.AdminPageDetail',
            methods=['GET', 'POST'],
            name='pages-detail'
        ),
    ]
).routes

# These should all inherit from base.handlers.BaseCronHandler
_CRON_ROUTES = MultiPrefixRoute(
    handler_pfx='app.handlers.jobs.',
    name_pfx='jobs-',
    path_pfx='/_taskqueue/jobs',
    routes=[]
).routes

# These should all inherit from base.handlers.BaseTaskHandler
# Task endpoints
_TASK_ROUTES = MultiPrefixRoute(
    handler_pfx='app.handlers.tasks.',
    name_pfx='tasks-',
    path_pfx='/_taskqueue/tasks',
    routes=[]
).routes

# Aggregate all the routes into something we can pass directly to our WSGI app
ROUTES = list(itertools.chain(
    _UNAUTHENTICATED_AJAX_ROUTES,
    _USER_ROUTES,
    _AJAX_ROUTES,
    _ADMIN_ROUTES,
    _ADMIN_AJAX_ROUTES,
    _CRON_ROUTES,
    _TASK_ROUTES,
    _UNAUTHENTICATED_ROUTES,
))
