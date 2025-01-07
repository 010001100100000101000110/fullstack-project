const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');


const dbFunctions = {

    async initialize() {
        try {
            await new Promise((resolve, reject) => {
                db.run('CREATE TABLE IF NOT EXISTS Wordpairs (id INTEGER PRIMARY KEY, english TEXT, finnish TEXT)', (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            })

            const rowCount = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) as count FROM Wordpairs', [], (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row.count);
                    }
                });
            });
            // Create a table
            console.log("ROWCOUNT", rowCount);
            if (rowCount === 0) {
                // await this.insert("red", "punainen");
                // await this.insert("yellow", "keltainen");
                await this.insert("black", "musta");
                await this.insert("cat", "kissa");
                // await this.insert("mouse", "hiiri");
            }

        } catch (err) {
            console.err("ERROR WITH INITIALIZING: ", err);
        }
    },

    async insert(engWord, finWord) {
        return new Promise(async (resolve, reject) => {
            // Insert data
            db.run(`INSERT INTO Wordpairs(english, finnish) VALUES (?, ?)`,
                [engWord, finWord], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    },

    async findById(id) {
        console.info(`finding by id...${id}`);
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM Wordpairs WHERE id = ?`, [id], (err, row) => {
                if (err) {
                    console.error("Query failed: ", err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    },

    async updateWordpair(id, data) {
        console.info(`updating by id...${id}`);
        return new Promise((resolve, reject) => {
            const query = `UPDATE Wordpairs SET english = ?, finnish = ? WHERE id = ?`;
            db.run(query, [data.english, data.finnish, data.id], (err, rows) => {
                if (err) {
                    console.error("failed to update", err);
                    reject(err);
                    return;
                }
                console.info(`Wordpair updated`);
                resolve(rows);
            })
        })
    },

    async getWordpairs() {
        console.info(`getting all...`);
        return new Promise(async (resolve, reject) => {
            // Query data
            db.all('SELECT * FROM Wordpairs', [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        })
    },

    async deleteById(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM Wordpairs WHERE id = ?`, [id], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    },

    close() {
        // Close the database
        db.close();
    }
}

module.exports = dbFunctions;