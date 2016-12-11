
module.exports.policies = {
  '*': 'auth',
	UserController: {
    'login': true,
    'register': true
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
