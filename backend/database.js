const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');


const dbFunctions = {

    async initialize() {
        try {
            await new Promise((resolve, reject) => {
                db.run('CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY, latitude DECIMAL(9,6), longitude DECIMAL(9,6))', (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            })
            // Create a table
            await this.insert(27, 8);
            await this.insert(98, 23);
            await this.insert(5, 79);
            await this.insert(18, 12);
            await this.insert(46, 6);
        } catch (err) {
            console.err("ERROR WITH INITIALIZING: ", err);
        }
    },

    async insert(lat, lon) {
        return new Promise(async (resolve, reject) => {
            // Insert data
            db.run(`INSERT INTO Locations(latitude, longitude) VALUES (?, ?)`,
                [lat, lon], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    },

    async getLocations() {
        return new Promise(async (resolve, reject) => {
            // Query data
            db.all('SELECT * FROM locations', [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        })
    },

    close() {
        // Close the database
        db.close();
    }
}

module.exports = dbFunctions;