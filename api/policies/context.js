var context = require('request-context');

module.exports = function(req, res, next) {
  var sails = req._sails;
  if(!req.user) return next();
  sails.models.user.find(req.user).populate('roles').exec(function(err, result) {
    if(result.length > 0) {
      context.set('request:user', result[0]);
    }
    next();
  });
};
