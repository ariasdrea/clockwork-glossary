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
    SELECT slovo 
    FROM glossary
    WHERE slovo ILIKE $1`,
        [`${val}%`]
    );

exports.getMeaning = (val) =>
    db
        .query(
            `
    SELECT meaning 
    FROM glossary
    WHERE slovo=$1`,
            [val]
        )
        .then(({ rows }) => rows[0]);
