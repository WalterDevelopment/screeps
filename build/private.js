const cpy = require('cpy');
const config = require('../.screeps.json');

cpy('./dist/*.js', config.private_directory);
