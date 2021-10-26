DROP TABLE IF EXISTS glossary;

CREATE TABLE glossary (
    id SERIAL primary key,
    slovo TEXT,
    meaning TEXT
);