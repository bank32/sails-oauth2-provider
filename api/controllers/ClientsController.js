/**
 * ClientsController
 *
 * @description :: Server-side logic for managing clients
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 module.exports = {
   	register: function(req, res)
   	{
      	API(Registration.registerClient, req, res);
   	},

   	'verify': function(req, res)
   	{
      	API(Registration.verifyClient, req, res);
  	}
};