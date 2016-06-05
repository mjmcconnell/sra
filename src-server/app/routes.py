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
        Route(r'/about', 'AboutHandler', name='about'),
        Route(r'/events', 'EventsHandler', name='events'),
        Route(r'/workshops', 'WorkshopHandler', name='workshops'),
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
        # about_modules
        Route(
            r'/about_modules',
            'about_modules.ListHandler',
            name='about_modules-list'
        ),
        Route(
            r'/about_modules/add',
            'about_modules.DetailHandler',
            name='about_modules-detail'
        ),
        Route(
            r'/about_modules/<id:[0-9]+>',
            'about_modules.DetailHandler',
            name='about_modules-detail'
        ),
        # events
        Route(r'/events', 'events.ListHandler', name='events-list'),
        Route(
            r'/events/add',
            'events.DetailHandler',
            name='events-detail'
        ),
        Route(
            r'/events/<id:[0-9]+>',
            'events.DetailHandler',
            name='events-detail'
        ),
        # workshops
        Route(r'/workshops', 'workshops.ListHandler', name='workshops-list'),
        Route(
            r'/workshops/add',
            'workshops.DetailHandler',
            name='workshops-detail'
        ),
        Route(
            r'/workshops/<id:[0-9]+>',
            'workshops.DetailHandler',
            name='workshops-detail'
        ),
        # images
        Route(
            r'/images',
            'images.ListHandler',
            name='images-list'
        ),
        Route(
            r'/images/add',
            'images.DetailHandler',
            name='images-detail'
        ),
        Route(
            r'/images/<id:[0-9]+>',
            'images.DetailHandler',
            name='images-detail'
        ),
        # pages
        Route(r'/pages', 'pages.ListHandler', name='pages-list'),
        Route(
            r'/pages/<id:[0-9]+>',
            'pages.DetailHandler',
            name='pages-detail'
        ),
    ]
).routes

# These should all inherit from base.handlers.AdminAjaxHandler
_ADMIN_AJAX_ROUTES = MultiPrefixRoute(
    handler_pfx='app.handlers.apis.',
    name_pfx='admin-api-',
    path_pfx='/api/admin',
    routes=[
        Route(
            r'/about_modules',
            'about_modules.AdminList',
            name='events-list'
        ),
        Route(
            r'/about_modules/add',
            'about_modules.AdminList',
            name='about_modules-detail'
        ),
        Route(
            r'/about_modules/<_id:\d+>',
            'about_modules.AdminDetail',
            name='about_modules-detail'
        ),
        Route(
            r'/events',
            'events.AdminList',
            name='events-list'
        ),
        Route(
            r'/events/add',
            'events.AdminList',
            name='events-detail'
        ),
        Route(
            r'/events/<_id:\d+>',
            'events.AdminDetail',
            name='events-detail'
        ),
        Route(
            r'/workshops',
            'workshops.AdminList',
            name='workshops-list'
        ),
        Route(
            r'/workshops/add',
            'workshops.AdminList',
            name='workshops-detail'
        ),
        Route(
            r'/workshops/<_id:\d+>',
            'workshops.AdminDetail',
            name='workshops-detail'
        ),
        Route(
            r'/images',
            'images.AdminList',
            name='images-list'
        ),
        Route(
            r'/images/add',
            'images.AdminList',
            name='images-detail'
        ),
        Route(
            r'/images/<_id:\d+>',
            'images.AdminDetail',
            name='images-detail'
        ),
        Route(
            r'/pages',
            'pages.AdminList',
            name='pages-list'
        ),
        Route(
            r'/pages/<_id:\d+>',
            'pages.AdminDetail',
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
