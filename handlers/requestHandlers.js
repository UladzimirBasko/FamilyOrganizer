/**
 * Created by Vladimir on 30.03.2016.
 */

var fs = require('fs');
var userHandler = require('./userHandler');

function startPage(request, response) {
    fs.readFile('views/pages/index/index.html', function(err, info) {
        if(err) {
            writeError(err, response);
        }
        response.write(info);
        response.end();
    });
}

function users(request, response) {
    userHandler.handle(request, response);
}

function writeError(err, response) {
    console.log(err);
    response.statusCode = 500;
    response.write('На сервере произошла ошибка !');
};

function okHandle(response, text) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(text);
    response.end();
}

exports.startPage = startPage;
exports.users = users;