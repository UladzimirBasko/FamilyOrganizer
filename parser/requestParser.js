/**
 * Created by Vladimir on 05.04.2016.
 */
var url = require('url');

function getParams (reqUrl, error) {
    var search = url.parse(reqUrl).search;
    if(search == null) {
        error = "Failed to parse params";
        return null;
    }
    var searchParams = search.split("?");
    if(!searchParams || searchParams.length < 2) {
        error = "Failed to parse params";
        return null;
    }
    return getJsonFromUrl(searchParams[1]);
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

exports.getSubPath = getSubPath;
exports.getParams = getParams;
exports.getRootPath = getRootPath;