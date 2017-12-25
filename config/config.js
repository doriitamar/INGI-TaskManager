'use strict';

let consts = require('./consts');

// Change of enviroment variables
switch (consts.RELEASE) {
  case('prod'):
    module.exports.PORT = 80;
    break;
  case('debug'):
    module.exports.PORT = 1269;
    break;
}