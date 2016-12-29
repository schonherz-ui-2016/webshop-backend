var context = require('request-context');

module.exports = {

  /**
   * @param {...Function} predicates
   * @returns {Function}
   */
  or: function(predicates) {
    var predicateArray = Array.prototype.slice.call(arguments);
    return function(values, cb) {
      var predicatesLeft = arguments.length;
      var errors = [];
      predicateArray.map(function(predicate) {
        predicate(values, function(err) {
          if(err) errors.push(err);
          predicatesLeft--;
          if(predicatesLeft > 0) return;
          if(errors.length >= predicateArray.length) return cb(errors[0]);
          cb();
        });
      });
    }
  },

  /**
   * @param {string} requiredRole
   * @returns {Function}
   */
  hasRole: function(requiredRole) {
    return function hasRole(values, cb) {
      var user = context.get('request:user');
      if(!user || !user.roles) return cb('Unauthenticated');
      var hasRole = user.roles.some(function (role) {
        return role.role == requiredRole;
      });
      if (!hasRole) return cb('Unauthorized');
      return cb();
    };
  },

  /**
   * @param {string} userIdField
   * @returns {Function}
     */
  isOwn: function(userIdField) {
    return function isOwn(values, cb) {
      var user = context.get('request:user');
      if(!user) return cb('Unauthenticated');
      if(!(userIdField in values)) return cb('Invalid check');
      if(values[userIdField] !== user.id) return cb('Unauthorized');
      cb();
    }
  }
};
