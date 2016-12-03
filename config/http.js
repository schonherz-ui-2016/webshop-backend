
var passport = require('passport');

module.exports.http = {
  middleware: {
    order: [
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
    passportInit: passport.initialize()
  }
};
