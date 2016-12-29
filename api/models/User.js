var auth = require('./auth/auth');

module.exports = {
  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    orders: {
      collection: 'Order',
      via: 'user'
    },
    roles: {
      collection: 'Role',
      via: 'user'
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    },
    beforeUpdate: auth.or(auth.isOwn('id'), auth.hasRole('admin'))
  }
};

