/**
 * Created by Vladimir on 30.03.2016.
 */

var parser = require('../parser/requestParser');

function route(handle, request, response) {
    var rootPath = parser.getRootPath(request.url);
    if(typeof handle[rootPath] === 'function') {
        return handle[rootPath](request, response);
    } else {
        response.statusCode = 404;
        response.write("404 Not Found");
        response.end();
    }
}

exports.route = route;