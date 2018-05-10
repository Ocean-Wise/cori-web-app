// PostgreSQL
const promise = require('bluebird');
const options = {
  // Initialization option for database
  promiseLib: promise,
};

const pgp = require('pg-promise')(options);
// Connect to the Heroku PostgreSQL database
const db = pgp(`${process.env.DATABASE_URL}?ssl=true`);

const createUser = (name, email, password) => {
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
  return db.one(query, [name, email, password, 'Consultation Started']);
};

const findUserById = (id) => {
  const query = `
    SELECT *
    FROM users
    WHERE id=$1`;
  return db.oneOrNone(query, [id]);
};

const verifyUser = (email) => {
  const query = `
    SELECT *
    FROM users
    WHERE email=$1`;
  return db.oneOrNone(query, [email]);
};

module.exports = { createUser, findUserById, verifyUser };
