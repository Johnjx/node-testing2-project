const knex = require('knex');
const configs = require('../knexfile');
const envt = process.env.NODE_ENV || 'development';

module.exports = knex(configs[envt]);