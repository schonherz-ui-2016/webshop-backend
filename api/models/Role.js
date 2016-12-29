var auth = require('./auth/auth');

module.exports = {
  attributes: {
    user: {
      model: 'User'
    },
    role: 'string'
  },
  beforeCreate: auth.hasRole('admin'),
  beforeUpdate: auth.hasRole('admin')
};

