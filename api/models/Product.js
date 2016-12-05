
module.exports = {
  attributes: {
    category: {
      model: 'Category'
    },
    warehouses: {
      collection: 'WarehouseItem',
      via: 'product'
    }
  }
};

