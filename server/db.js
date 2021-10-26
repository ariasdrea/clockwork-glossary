const spicedPg = require("spiced-pg");
const db = spicedPg(`postgres:postgres:postgres@localhost:5432/clockwork`);

exports.addSlovos = (slovo, meaning) =>
    db.query(
        `
            INSERT INTO glossary (slovo, meaning)
            VALUES ($1, $2)
            RETURNING slovo, meaning`,
        [slovo, meaning]
    );

exports.getSlovos = (val) =>
    db.query(
        `
    SELECT slovo, meaning 
    FROM glossary
    WHERE slovo ILIKE $1`,
        [`${val}%`]
    );
