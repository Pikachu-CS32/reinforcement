const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.PSQL_CONNSTRING,
});

module.exports = {
  query: (text, params) => {
    console.log('Executing query:', text);
    return pool.query(text, params);
  },
};
