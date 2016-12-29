var auth = require('./auth/auth');

module.exports = {
  attributes: {
    products: {
      collection: 'Product',
      via: 'category'
    },
    parent: {
      model: 'Category'
    },
    categories: {
      collection: 'Category',
      via: 'parent'
    }
  },
  beforeCreate: auth.hasRole('admin'),
  beforeUpdate: auth.hasRole('admin')
};

