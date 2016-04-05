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

        var user  = new User(1, login, pass);
        user = db.Storage.findUser(user, ['id']);

        response.statusCode = 200;
        if(user != null) {
            response.write(user.toString());
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
        var newUser = new User(users.length, fName, lName, mName);
        db.Storage.addUser(newUser);
        users[users.length] = newUser;

        console.log("New users: "+users);
        var resStr;
        for(var i=0; i<users.length; i++) {
            resStr = resStr + users[i].login;
        }

        response.statusCode = 200;
        response.write(resStr);
        response.end();
    }
}

exports.handle = handle;