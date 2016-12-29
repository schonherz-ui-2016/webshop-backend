var auth = require('./auth/auth');

module.exports = {
  attributes: {
    warehouse: {
      model: 'Warehouse'
    },
    product: {
      model: 'Product'
    }
  },
  beforeCreate: auth.hasRole('admin'),
  beforeUpdate: auth.hasRole('admin')
};

