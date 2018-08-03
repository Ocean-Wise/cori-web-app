DROP TABLE IF EXISTS annapolis;

CREATE TABLE annapolis (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  divedate VARCHAR,
  images VARCHAR,
  videolink VARCHAR,
  comments VARCHAR
);
