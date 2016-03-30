/**
 * Created by Vladimir on 30.03.2016.
 */

var http = require("http");

function start(router, handlers) {
    function onRequest(request, response) {
        router.route(handlers, request, response);
    }
    http.createServer(onRequest).listen(3000);
    console.log("Server has started.");
}

exports.start = start;