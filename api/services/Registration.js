module.exports = {
    currentUser: function(data,context)
    {
        return context.identity;
    },

    registerUser: function (data, context) 
    {
        var date = new Date();
        return API.Model(Users).create({
            username: data.username,
            email: data.email,
            password: data.password,
            date_registered: date
        }).then(function (user) 
        {
            context.id = user.username;
            context.type = 'Username';
            return Tokens.generateToken({
                user_id: user.id,
                client_id: Tokens.generateTokenString()
            });
        }).then(function (token) 
        {
            return {
                url: sails.config.security.server.url + "/users/verify/" + data.email + "?code=" + token.code
            }
        });
    },

    verifyUser: function (data, context) 
    {
        return Tokens.authenticate({
            code: data.code,
            type: 'verification',
            email: data.email
        }).then(function (info) 
        {
            var date = new Date();
            if (!info) return Promise.reject('Unauthorized');

            API.Model(Users).update({username: info.identity.username}, {date_verified: date});

            return {
                verified: true,
                email: info.identity.email
            }
        });
    },

    registerClient: function (data, context) 
    {
        var date = new Date();
        return Clients.create({
            client_id: Tokens.generateTokenString(),
            client_secret: Tokens.generateTokenString(),
            email: data.email,
            date_registered: date
        }).then(function (client) 
        {
            context.id = client.client_id;
            context.type = 'Client ID';

            return Tokens.generateToken({
                client_id: client.client_id
            });
        }).then(function (token) 
        {
            return {
                url: sails.config.security.server.url + "/clients/verify/" + data.email + "?code=" + token.code
            }
        });
    },

    verifyClient: function (data, context) 
    {
        return Tokens.authenticate({
            type: 'verification',
            code: data.code,
            email: data.email
        }).then(function (info) 
        {
            var date = new Date();
            if (!info) return Promise.reject('Unauthorized');

            API.Model(Clients).update({client_id: info.identity.client_id}, {date_verified: date});

            return {
                verified: true,
                email: info.identity.email
            };
        });
    }
};