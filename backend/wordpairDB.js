const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');


const dbFunctions = {

    async initialize() {
        try {
            console.info("initializing wordpair database...");
            await new Promise((resolve, reject) => {
                db.run('CREATE TABLE IF NOT EXISTS Wordpairs (id INTEGER PRIMARY KEY AUTOINCREMENT, english TEXT, finnish TEXT, swedish TEXT, tags TEXT)', (err) => {
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
            if (rowCount === 0) {
                await this.insert("red", "punainen", "röd", "1");
                await this.insert("black", "musta", "svart", "1");
                await this.insert("cat", "kissa", "katt", "2");
                await this.insert("mouse", "hiiri", "mus", "2");
                await this.insert("bus", "bussi", "buss", "3");
                await this.insert("bike", "polkupyörä", "cykel", "3");
                await this.insert("apple", "omena", "äppel", "4,5");
                await this.insert("meatballs", "lihapullat", "köttbullar", "4");
            }

        } catch (err) {
            console.error("ERROR WITH INITIALIZING: ", err);
        }
    },

    async insert(engWord, finWord, sweWord, tags) {
        console.info(`inserting into wordpair database...`);
        return new Promise(async (resolve, reject) => {
            // Insert data
            db.run(`INSERT INTO Wordpairs(english, finnish, swedish, tags) VALUES (?, ?, ?, ?)`,
                [engWord, finWord, sweWord, tags], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                        console.info(`insert to wordpair database successful`);
                    }
                }
            );
        });
    },

    async findById(id) {
        console.info(`finding wordpair by id...${id}`);
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM Wordpairs WHERE id = ?`, [id], (err, row) => {
                if (err) {
                    console.error("FindById query failed: ", err);
                    reject(err);
                    return;
                }
                console.info(`Wordpair found!`);
                resolve(row);
            });
        });
    },

    async updateWordpair(id, data) {
        console.info(`updating wordpair by id...${id}`);
        return new Promise((resolve, reject) => {
            const query = `UPDATE Wordpairs SET english = ?, finnish = ?, swedish = ?, tags = ? WHERE id = ?`;
            db.run(query, [data.english, data.finnish, data.swedish, data.tags, id], (err) => {
                if (err) {
                    console.error("failed to update wordpair", err);
                    reject(err);
                    return;
                }
                console.info(`Wordpair updated`);
                resolve(this.changes);
            })
        })
    },

    async getWordpairs() {
        console.info(`getting all wordpairs...`);
        return new Promise(async (resolve, reject) => {
            // Query data
            db.all('SELECT * FROM Wordpairs', [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                console.info(`Wordpairs fetched!`);
                resolve(rows);
            });
        })
    },

    async deleteById(id) {
        console.info("Deleting wordpair...");
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM Wordpairs WHERE id = ?`, [id], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
                console.info("Wordpair deleted!");
            });
        });
    },

    close() {
        // Close the database
        db.close();
    }
}

module.exports = dbFunctions;