/**
 * Created by Vladimir on 30.03.2016.
 */
var fs = require('fs');
function start(request, response) {
    okHandle(response, "Index page");
}

function users(request, response) {
    okHandle(response, "Users page");
}

function rooms(request, response) {
    okHandle(response, "Rooms page");
}

function roomsPage(req, res) {
    fs.readFile('views/rooms.html', function(err, info) {
        if(err) {
            writeError(err, res);
        }
        res.end(info);
    });
}

function writeError(err, res) {
    console.log(err);
    res.statusCode = 500;
    res.end('На сервере произошла ошибка !');
};

function okHandle(response, text) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(text);
    response.end();
}

exports.start = start;
exports.users = users;
exports.rooms = rooms;
exports.roomsPage = roomsPage;