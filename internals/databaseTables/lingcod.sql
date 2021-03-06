DROP TABLE IF EXISTS lingcod;

CREATE TABLE lingcod (
  ID SERIAL PRIMARY KEY,
  divera JSON,
  diverb JSON,
  divedate VARCHAR,
  generalLocation VARCHAR,
  specificLocation VARCHAR,
  gps VARCHAR,
  bottomType VARCHAR,
  bottomTime VARCHAR,
  nests JSON,
  additionalComments VARCHAR
);
