/**
 * Created by Vladimir on 30.03.2016.
 */

var url = require("url");

function route(handle, request, response) {
    var pathname = url.parse(request.url).pathname;
    if (typeof handle[pathname] === 'function') {
        return handle[pathname](request, response);
    } else {
        response.statusCode = 404;
        response.end();
    }
}

exports.route = route;