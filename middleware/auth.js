'use strict';

var querystring = require('querystring');
var request = require('request').defaults({jar: true});
var consts = require('../config/consts');
var config = require('../config/config');

var form = {
  auth_method_id: "0",
  login: "test",
  password: "test"
};

module.exports.auth = (req, res, next) => {
  // Check if already authenticated
  request(`http://${consts.INGI_URL}/api/v0/authentication`, (err, response, body) => {
    if((JSON.parse(body)).authenticated) {
      next();
    } else {
      // Authenticate from scratch
      var formData = querystring.stringify(form);
      var contentLength = formData.length;
      var requestOptions = {
        headers: {'Content-Length': contentLength, 'Content-Type': 'application/x-www-form-urlencoded'},
        uri: `http://${consts.INGI_URL}/api/v0/authentication`,
        body: formData,
        method: 'POST'
      };

      request(requestOptions, (err, response, body) => {
        if((JSON.parse(body)).status == "success") {
          next();
        } else {
          res.end('Inginious authentication failed, maybe it\'s down');
        }
      })
    }
  })
}