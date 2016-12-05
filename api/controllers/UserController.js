
var _ = require('lodash');
var Q = require('q');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = {

  login: function (req, res) {
    var sails = req._sails;
    Q.nfcall(sails.models.user.findOne, {email: req.body.email}).then(function (user) {
      return Q.all([Q.nfcall(bcrypt.compare, req.body.password, user.password), user]);
    }).then(_.spread(function (result, user) {
      if (!result) return Q.reject();
      return Q.nfcall(jwt.sign, {id: user.id}, sails.config.secret, {expiresIn: sails.config.jwtExpiresIn});
    })).then(function (token) {
      res.send({token: token});
    }).catch(function(err) {
      res.status(500).send(err);
    });
  },

  register: function (req, res) {
    var sails = req._sails;
    Q.nfcall(bcrypt.hash, req.body.password, 10).then(function(hash) {
      return Q.promise(function(resolve, reject) {
        sails.models.user.create({
          email: req.body.email,
          password: hash
        }).exec(function(err, user) {
          if(err) return reject(err);
          return resolve(user);
        });
      });
    }).then(function (user) {
      return res.send(user.id);
    }).catch(function(err) {
      res.status(500).send(err);
    });
  },

  me: function(req, res) {
    res.send(JSON.stringify(req.user));
  }
};

