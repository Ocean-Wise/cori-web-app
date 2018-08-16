DROP TABLE IF EXISTS rockfish;

CREATE TABLE rockfish (
  ID SERIAL PRIMARY KEY,
  divedate VARCHAR,
  name VARCHAR,
  address VARCHAR,
  phone VARCHAR,
  email VARCHAR,
  generalLocation VARCHAR,
  specificLocation VARCHAR,
  gps VARCHAR,
  bottomType VARCHAR,
  bottomTime VARCHAR,
  averageDepth VARCHAR,
  maximumDepth VARCHAR,
  speciesData JSON,
  additionalComments VARCHAR
);
