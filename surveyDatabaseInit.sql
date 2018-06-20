CREATE TABLE lingcod (
  ID SERIAL PRIMARY KEY NOT NULL,
  data jsonb
);

CREATE TABLE rockfish (
  ID SERIAL PRIMARY KEY NOT NULL,
  data jsonb
);

CREATE TABLE annapolis (
  ID SERIAL PRIMARY KEY NOT NULL,
  data jsonb
);

CREATE TABLE seastars (
  ID SERIAL PRIMARY KEY NOT NULL,
  data jsonb
);

CREATE TABLE sixgills (
  ID SERIAL PRIMARY KEY NOT NULL,
  data jsonb
);

-- Sample entry:
-- INSERT INTO lingcod VALUES ('{"divedate": "2018-01-01", "divera": {"name": "ethan"}, ...}')
