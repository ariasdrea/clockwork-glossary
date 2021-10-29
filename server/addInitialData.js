const { addSlovos } = require("./db");
const data = require("./data");

// only invoke this function first time deploying
exports.addDataInDb = () => {
    if (process.env.DATABASE_URL) {
        for (let i = 0; i < data.length; i++) {
            for (let prop in data[i]) {
                addSlovos(prop, data[i][prop]);
            }
        }
    }
};
