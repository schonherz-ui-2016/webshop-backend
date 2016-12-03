
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
  }
};

