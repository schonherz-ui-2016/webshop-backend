
var fixtures = require('sails-fixtures');
var passport = require('passport');
var passportJwt = require('passport-jwt');

module.exports.bootstrap = function(cb) {
  var strategy = new passportJwt.Strategy({
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
    secretOrKey: sails.config.secret
  }, function(payload, done) {
    return done(null, payload.id);
  });

  passport.use(strategy);

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  fixtures.init({
    'dir':'./fixtures' 
  }, cb);
};
