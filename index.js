/**
 * Created by Vladimir on 30.03.2016.
 */

var server = require('./server');
var router = require('./routes/router');
var requestHandlers = require('./handlers/requestHandlers');

var handlers = {};
handlers["/"] = requestHandlers.startPage;
handlers["/users"] = requestHandlers.users;
handlers["/rooms"] = requestHandlers.roomsPage;
handlers["/rooms.html"] = requestHandlers.roomsPage;

server.start(router, handlers);