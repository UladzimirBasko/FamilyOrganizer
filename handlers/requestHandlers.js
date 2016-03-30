/**
 * Created by Vladimir on 30.03.2016.
 */

function start(request, response) {
    okHandle(response, "Index page");
}

function users(request, response) {
    okHandle(response, "Users page");
}

function rooms(request, response) {
    okHandle(response, "Rooms page");
}

function okHandle(response, text) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(text);
    response.end();
}

exports.start = start;
exports.users = users;
exports.rooms = rooms;