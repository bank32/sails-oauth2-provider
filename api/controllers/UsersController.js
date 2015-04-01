module.exports = {
    login:function(req, res)
    {
        res.view('users/login');
    },

    formRegister: function(req, res)
    {
        res.view('users/form-register');
    },

    register: function(req, res)
    {
    	API(Registration.registerUser, req, res);
    },

    'verify': function(req, res)
    {
     	API(Registration.verifyUser, req, res);
    },

    current: function(req, res)
    {
       	API(Registration.currentUser, req, res);
    },
};