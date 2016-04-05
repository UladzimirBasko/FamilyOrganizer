/**
 * Created by Vladimir on 30.03.2016.
 */

var server = require('./server');
var router = require('./routes/router');
var requestHandlers = require('./handlers/requestHandlers');

var handlers = {};
handlers["index"] = requestHandlers.startPage;
handlers["user"] = requestHandlers.users;

server.start(router, handlers);