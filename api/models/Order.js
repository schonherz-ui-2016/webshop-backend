var auth = require('./auth/auth');

module.exports = {
  attributes: {
    user: {
      model: 'User'
    },
    items: {
      collection: 'OrderItem',
      via: 'order'
    }
  },
  beforeCreate: auth.or(auth.isOwn('user'), auth.hasRole('admin')),
  beforeUpdate: auth.or(auth.isOwn('user'), auth.hasRole('admin'))
};

