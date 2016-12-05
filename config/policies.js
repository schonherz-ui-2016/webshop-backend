
module.exports.policies = {
  '*': 'auth',
	UserController: {
    'login': true
  },
  ProductController: {
    'find': true,
    'findOne': true
  },
  CategoryController: {
    'find': true,
    'findOne': true
  }
};
