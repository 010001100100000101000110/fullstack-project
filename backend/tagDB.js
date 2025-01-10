const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const tagDBFunctions = {

    async initialize() {
        try {
            await new Promise((resolve, reject) => {
                db.run('CREATE TABLE IF NOT EXISTS Tags (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)', (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            })

            const rowCount = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) as count FROM Tags', [], (err, row) => {
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
                await this.insert("color");
                await this.insert("animal");
                await this.insert("vehicle");
                await this.insert("food");
                await this.insert("fruit");
            }

        } catch (err) {
            console.error("ERROR WITH INITIALIZING: ", err);
        }
    },

    async insert(tagName) {
        return new Promise(async (resolve, reject) => {
            // Insert data
            db.run(`INSERT INTO Tags(name) VALUES (?)`,
                [tagName], (err) => {
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
        console.info(`finding tag by id...${id}`);
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM Tags WHERE id = ?`, [id], (err, row) => {
                if (err) {
                    console.error("findById query failed: ", err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    },
    // async findByName(name) {
    //     console.info(`finding tag by name...${name}`);
    //     return new Promise((resolve, reject) => {
    //         db.get(`SELECT * FROM Tags WHERE name = ?`, [name], (err, row) => {
    //             if (err) {
    //                 console.error("Query failed: ", err);
    //                 reject(err);
    //                 return;
    //             }
    //             resolve(row);
    //         });
    //     });
    // },

    async updateTag(id, name) {
        console.info(`updating by id...${id}`);
        return new Promise((resolve, reject) => {
            const query = `UPDATE Tags SET name = ? WHERE id = ?`;
            db.run(query, [name, id], (err) => {
                if (err) {
                    console.error("failed to update", err);
                    reject(err);
                    return;
                }
                console.info(`Tag updated`);
                resolve(this.changes);
            })
        })
    },

    async getTags() {
        console.info(`getting all...`);
        return new Promise(async (resolve, reject) => {
            // Query data
            db.all('SELECT * FROM Tags', [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        })
    },

    async deleteById(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM Tags WHERE id = ?`, [id], (err, row) => {
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

module.exports = tagDBFunctions;