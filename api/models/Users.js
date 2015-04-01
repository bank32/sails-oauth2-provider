/**
 * Users.js
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {
    attributes: 
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: 'integer',
            index: true
        },
        username: 
        {
            type: 'string',
            unique: true,
            required: true
        },

        email: 
        {
            type: 'email',
            unique: true,
            required: true
        },

        password: 
        {
            type: 'string',
            required: true,
            columnName: 'encrypted_password',
            minLength: 8
        },

        first_name: {
            type: 'string'
        },

        last_name: {
            type: 'string'
        },

        location: {
            type: 'string'
        },

        date_registered: {
            type: 'datetime'
        },

        date_verified: {
            type : 'datetime'
        },

        comparePassword: function(password) 
        {
            return bcrypt.compareSync(password, this.password);
        },

        toJSON: function() 
        {
            var obj = this.toObject();
            delete obj.password;

            return obj;
        }
    },

    beforeCreate: function(user, next) 
    {
        if (user.hasOwnProperty('password')) 
        {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
            next(false, user);

        } 
        else 
        {
            next(null, user);
        }
    },

    beforeUpdate: function(user, next) 
    {
        if (user.hasOwnProperty('password')) 
        {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
            next(false, user);
        } 
        else 
        {
            next(null, user);
        }
    },

    authenticate: function (username, password) 
    {
        return Users.findOne({username: username}).then(function(user)
        {
            return (user && user.date_verified && user.comparePassword(password))? user : null;
        });
    }
};