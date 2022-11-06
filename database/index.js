const Pool = require("pg").Pool;
const pgUrl = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const credentials = {
  user: "postgres",
  host: "localhost",
  database: "finding_house",
  password: "dutran917",
  port: 5432,
};
const pool = new Pool(credentials);
const poolStart = async () => {
  const now = await pool.query("SELECT NOW()");
  return now;
};
module.exports = {
  pool,
  poolStart,
};
