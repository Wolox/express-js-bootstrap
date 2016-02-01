
exports.getModel = function (orm, db) {
    return db.define('user', {
        firstName   :   { type: 'text', required: true },
        lastName    :   { type: 'text', required: true },
        username    :   { type: 'text', required: true },
        email       :   { type: 'text', required: true },
        password    :   { type: 'text', required: true }
    }, {
        validations: {
            username    :   orm.enforce.unique('username already taken!'),
            email       :   orm.enforce.unique('email already taken!') 
        }
    });
}

exports.isValid = function (user) {

    if (user) {
        var firstName = user.firstName && user.firstName.length > 0;
        var lastName = user.lastName && user.lastName.length > 0;
        var username = user.username && user.username.length > 0;
        var email = user.email && user.email.length > 0;
        var password = user.password && user.password.length > 0;

        return firstName && lastName && username && email && password;
    }

    return false;
};
