var User = require('../model/User');
var diff = require('deep-diff');

function Storage() {

    var userStorage = [];

    var API = {};

    API.getUsers = function() {
        return userStorage;
    };

    API.addUser = function(user) {
        if(userStorage != null) {
            user.id = userStorage.length;
        }else {
            user.id = 0;
        }

        userStorage.push(user);
        console.log(userStorage);
    };
    
    API.findUser = function(user, exclusions) {
        if( ! exclusions) {
            return find(userStorage, user);
        } else {
            return findExcludeFields(userStorage, user, exclusions);
        }
    };

    function find(arr, obj) {
        return arr.filter(function (el) {
            return diff(obj, el) === undefined;
        });
    }

    function findExcludeFields(arr, obj, exclusions) {
        obj = arr.filter(function (el) {
            var diffs = diff(obj, el);
            diffs = diffs.filter(function(diff) {
               return exclusions.indexOf(diff.path[0]) === -1;
            });
            return diffs.length === 0;
        });
        return obj[0];
    }

    return API;
}

exports.Storage = new Storage();


