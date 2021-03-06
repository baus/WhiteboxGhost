var middleware  = require('../middleware').middleware,
    api         = require('../api'),
    config      = require('../config');

module.exports = function (server) {
    // ### API routes
    /* TODO: auth should be public auth not user auth */
    // #### Posts
    server.get(config().adminRoot + '/api/v0.1/posts', middleware.authAPI, middleware.disableCachedResult, api.requestHandler(api.posts.browse));
    server.post(config().adminRoot + '/api/v0.1/posts', middleware.authAPI, middleware.disableCachedResult, api.requestHandler(api.posts.add));
    server.get(config().adminRoot + '/api/v0.1/posts/:id', middleware.authAPI, middleware.disableCachedResult, api.requestHandler(api.posts.read));
    server.put(config().adminRoot + '/api/v0.1/posts/:id', middleware.authAPI, middleware.disableCachedResult, api.requestHandler(api.posts.edit));
    server.del(config().adminRoot + '/api/v0.1/posts/:id', middleware.authAPI, middleware.disableCachedResult, api.requestHandler(api.posts.destroy));
    // #### Settings
    server.get(config().adminRoot + '/api/v0.1/settings/', middleware.authAPI, middleware.disableCachedResult, api.requestHandler(api.settings.browse));
    server.get(config().adminRoot + '/api/v0.1/settings/:key/', middleware.authAPI, middleware.disableCachedResult, api.requestHandler(api.settings.read));
    server.put(config().adminRoot + '/api/v0.1/settings/', middleware.authAPI, middleware.disableCachedResult, api.requestHandler(api.settings.edit));
    // #### Users
    server.get(config().adminRoot + '/api/v0.1/users/', middleware.authAPI, middleware.disableCachedResult, api.requestHandler(api.users.browse));
    server.get(config().adminRoot + '/api/v0.1/users/:id/', middleware.authAPI, middleware.disableCachedResult, api.requestHandler(api.users.read));
    server.put(config().adminRoot + '/api/v0.1/users/:id/', middleware.authAPI, middleware.disableCachedResult, api.requestHandler(api.users.edit));
    // #### Tags
    server.get(config().adminRoot + '/api/v0.1/tags/', middleware.authAPI, middleware.disableCachedResult, api.requestHandler(api.tags.all));
    // #### Notifications
    server.del(config().adminRoot + '/api/v0.1/notifications/:id', middleware.authAPI, middleware.disableCachedResult, api.requestHandler(api.notifications.destroy));
    server.post(config().adminRoot + '/api/v0.1/notifications/', middleware.authAPI, middleware.disableCachedResult, api.requestHandler(api.notifications.add));
    // #### Import/Export
    server.get(config().adminRoot + '/api/v0.1/db/', middleware.auth, api.db['export']);
    server.post(config().adminRoot + '/api/v0.1/db/', middleware.auth, api.db['import']);
    server.del(config().adminRoot + '/api/v0.1/db/', middleware.authAPI, middleware.disableCachedResult, api.requestHandler(api.db.deleteAllContent));
};