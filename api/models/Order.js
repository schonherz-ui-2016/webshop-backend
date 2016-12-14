module.exports = {
  attributes: {
    user: {
      model: 'User'
    },
    items: {
      collection: 'OrderItem',
      via: 'order'
    }
  }
};

