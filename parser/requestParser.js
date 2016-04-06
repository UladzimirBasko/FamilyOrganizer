/**
 * Created by Vladimir on 05.04.2016.
 */
var url = require('url');
var qs = require('querystring');

function getParams (body, error) {
    if(body == null) {
        error = "Failed to parse params";
        return null;
    }
    return getJsonFromUrl(body);
}

function getRootPath (reqUrl, error) {
    var pathname = url.parse(reqUrl).pathname;
    var paths = pathname.split("/");
    if(!paths || paths.length < 2) {
        error = "Failed to parse root path";
        return null;
    }
    var rootPath = paths[1];
    if(!rootPath) {
        rootPath = "index";
    }
    return rootPath;
}

function getSubPath(reqUrl, error) {
    var pathname = url.parse(reqUrl).pathname;
    var pathComponent = pathname.split("/");
    if(!pathComponent || pathComponent.length < 2) {
        error = "Fialed to parser subpath";
        return null;
    }
    return pathComponent[pathComponent.length - 1];
}

function getJsonFromUrl(urlPath) {
    var result = {};
    urlPath.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

function  getJsonFromBody(request,callback) {
    var body = '';
    request.on('data', function (data) {
        body += data;
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6) {
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            request.connection.destroy();
        }
    });
    request.on('end', function () {
        var json = qs.parse(body);
        callback(json);
    });
}

exports.getSubPath = getSubPath;
exports.getParams = getParams;
exports.getRootPath = getRootPath;
exports.getJsonFromBody = getJsonFromBody;