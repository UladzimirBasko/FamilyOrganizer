/**
 * Created by Vladimir on 05.04.2016.
 */

var fs = require('fs');
var requestParser = require('../parser/requestParser');
var db = require('../db');
var User = require('../model/User');

function handle(request, response) {
    var error = null;
    var subPath = requestParser.getSubPath(request.url, error);
    if(subPath == null) {
        response.statusCode = 500;
        response.write(error);
        response.end();
        return;
    }
    switch (subPath) {
        case "login" : {
            userLogin(request, response);
            break;
        }
        case "register" : {
            userRegister(request, response);
            break;
        }
        default : {
            break;
        }
    }
}

function userLogin(request,response) {
    var error = null;
    var params = requestParser.getParams(request.url, error);
    if (params == null) {
        fs.readFile('views/pages/user/login.html', function (err, info) {
            if (err) {
                writeError(err, response);
            }
            response.write(info);
            response.end();
        });
    } else {
        var login = params["login"];
        var pass = params["password"];

        var user  = new User(0, login, pass);
        user = db.Storage.findUser(user, ['id','fName','lName','mName']);

        response.statusCode = 200;
        if(user != null) {
            response.write("Find user with login: "+user.login+" at name: "+user.fName);
        }else {
            response.write("There is no user with such credentials");
        }
        response.end();
    }
}

function userRegister(request, response) {
    var error = null;
    var params = requestParser.getParams(request.url, error);
    if (params == null) {
        fs.readFile('views/pages/user/register.html', function (err, info) {
            if (err) {
                writeError(err, response);
            }
            response.write(info);
            response.end();
        });
    } else {
        var login = params["login"];
        var pass = params["password"];
        var fName = params["fName"];
        var lName = params["lName"];
        var mName = params["mName"];

        var users = db.Storage.getUsers();
        var newUser = new User(users.length, login, pass, fName, lName, mName);
        db.Storage.addUser(newUser);

        response.statusCode = 200;
        response.write("New user was created");
        response.end();
    }
}

exports.handle = handle;