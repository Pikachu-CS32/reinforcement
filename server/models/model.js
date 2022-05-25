const { Pool } = require('pg');
process.env.PSQL_CONNSTRING = 'postgres://bfgmzagw:bQvIc87Yj-RS6fsRNeO2mNcILwfpB0Z1@fanny.db.elephantsql.com/bfgmzagw'
const pool = new Pool({
  connectionString: process.env.PSQL_CONNSTRING,
});

module.exports = {
  query: (text, params) => {
    console.log('Executing query:', text);
    return pool.query(text, params);
  },
};
