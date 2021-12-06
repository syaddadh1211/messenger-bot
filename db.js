const Pool = require("pg").Pool;

const pool = new Pool({
  user: "opqpncsallxncr",
  password: "1f584ff2ef7f4ad1fe55c00276e1178f014d27fdedaaaf8e8a14d4fc43b1e5c8",
  database: "d3eagvegm37rik",
  host: "ec2-3-230-219-251.compute-1.amazonaws.com",
  port: 5432,
});

module.exports = pool;
