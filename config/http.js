
var passport = require('passport');
var context = require('request-context');

module.exports.http = {
  middleware: {
    order: [
      'context',
      'startRequestTimer',
      'passportInit',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],
    passportInit: passport.initialize(),
    context: context.middleware('request')
  }
};
