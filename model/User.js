function User() {

    if(arguments.length === 1) {
        initFromObject.call(this, arguments['0']);
    } else if(arguments.length === 3) {
        initFromParams.call(this, arguments['0'], arguments['1'], arguments['2'] );
    }  else if(arguments.length === 6) {
        initFromParams.call(this, arguments['0'], arguments['1'], arguments['2'], arguments['3'], arguments['4'], arguments['5'] );
    } else {
        throw new Error('Wrong user constructor arguments');
    }
}

function initFromObject(user) {
    this.id = user.id;
    this.login = user.login;
    this.password = user.password;
}

function initFromParams(id, login, password) {
    this.id = id;
    this.login = login;
    this.password = password;
}

function initFromParams(id, password, login, fName, lName, mName) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.fName = fName;
    this.lName = lName;
    this.mName = mName;
}


module.exports = User;