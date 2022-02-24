const knexConfig = require("./knexfile");

const knex = require("knex")(knexConfig[process.env.NODE_ENV]);

exports.knex = knex;
