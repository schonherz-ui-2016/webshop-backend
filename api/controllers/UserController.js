
var _ = require('lodash');
var Q = require('q');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = {

  login: function (req, res) {
    var sails = req._sails;
    Q.nfcall(sails.models.user.findOne, {email: req.body.email}).then(function (user) {
      if (!user) throw new Error('no such user or wrong password');
      return Q.all([Q.nfcall(bcrypt.compare, req.body.password, user.password), user]);
    }).then(_.spread(function (result, user) {
      if (!result) throw new Error('no such user or wrong password');
      return Q.nfcall(jwt.sign, {id: user.id}, sails.config.secret, {expiresIn: sails.config.jwtExpiresIn});
    })).then(function (token) {
      res.send({token: token});
    }).catch(function(err) {
      res.status(500).send(JSON.stringify(err.message));
    });
  },

  register: function (req, res) {
    var sails = req._sails;
    Q.promise(function(resolve, reject){
      if(!req.body.password) throw new Error('no password provided');
      resolve();
    }).then(function() {
      return Q.nfcall(bcrypt.hash, req.body.password, 10);
    }).then(function(hash) {
      return Q.promise(function(resolve, reject) {
        delete req.body.id;
        req.body.password = hash;
        sails.models.user.create(req.body).exec(function(err, user) {
          if(err) return reject(err);
          return resolve(user);
        });
      });
    }).then(function (user) {
      return res.send(JSON.stringify(user.id));
    }).catch(function(err) {
      res.status(500).send(JSON.stringify(err.message));
    });
  },

  me: function(req, res) {
    Q.nfcall(sails.models.user.findOne, {id: req.user}).then(function (user) {
      res.send(JSON.stringify(user));
    });
  }
};

