var auth = require('./auth/auth');

module.exports = {
  attributes: {
    category: {
      model: 'Category'
    },
    warehouses: {
      collection: 'WarehouseItem',
      via: 'product'
    }
  },
  beforeCreate: auth.hasRole('admin'),
  beforeUpdate: auth.hasRole('admin')
};

