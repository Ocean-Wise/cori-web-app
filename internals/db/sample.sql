-- DROP DATABASE IF EXISTS plasticwise;
-- CREATE DATABASE plasticwise;

-- \c plasticwise;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL
);
