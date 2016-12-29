
module.exports.policies = {
  '*': ['auth', 'context'],
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
