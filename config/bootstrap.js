
var domain = require('domain');
var fixtures = require('sails-fixtures');
var passport = require('passport');
var passportJwt = require('passport-jwt');
var context = require('request-context');

module.exports.bootstrap = function(cb) {
  var strategy = new passportJwt.Strategy({
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
    secretOrKey: sails.config.secret
  }, function (payload, done) {
    return done(null, payload.id);
  });

  passport.use(strategy);

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  // fake admin roles for fixtures
  var dom = domain.create();
  context.setContext('request', {
    user: {
      roles: [{role: 'admin'}]
    }
  }, dom);

  dom.enter();

  fixtures.init({
    'dir': './fixtures'
  }, function () {
    dom.exit();
    cb();
  });
};
