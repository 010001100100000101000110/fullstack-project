const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');


const dbFunctions = {

    /**
     * Initializes the word pair database by creating the 'Wordpairs' table if it doesn't exist
     * and inserting default word pairs if the table is empty.
     * @returns {Promise<void>} Resolves when the initialization is done.
     */
    async initialize() {
        try {
            console.info("Initializing wordpair database...");
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

            // Insert default word pairs if the table is empty
            if (rowCount === 0) {
                await this.insert("red", "punainen", "röd", "1");
                await this.insert("black", "musta", "svart", "1");
                await this.insert("green", "vihreä", "grön", "1");
                await this.insert("cat", "kissa", "katt", "2");
                await this.insert("mouse", "hiiri", "mus", "2");
                await this.insert("dog", "koira", "hund", "2");
                await this.insert("bus", "bussi", "buss", "3");
                await this.insert("bike", "polkupyörä", "cykel", "3");
                await this.insert("car", "auto", "bil", "3");
                await this.insert("apple", "omena", "äppel", "4,5");
                await this.insert("pear", "päärynä", "päron", "4,5");
                await this.insert("meatballs", "lihapullat", "köttbullar", "4");

            }

        } catch (err) {
            console.error("Error initializing word pair database: ", err);
        }
    },

    /**
     * Inserts a new word pair into the 'Wordpairs' table.
     * @param {string} engWord - The word in English.
     * @param {string} finWord - The word in Finnish.
     * @param {string} sweWord - The word in Swedish.
     * @param {string} tags - The tags associated with the word pair.
     * @returns {Promise<void>} Resolves when the word pair is inserted.
     */
    insert(engWord, finWord, sweWord, tags) {
        console.info(`Inserting word pair into database...`);
        try {
            return new Promise((resolve, reject) => {
                db.run(`INSERT INTO Wordpairs(english, finnish, swedish, tags) VALUES (?, ?, ?, ?)`,
                    [engWord, finWord, sweWord, tags], (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                            console.info(`Inserting word pair to database successful`);
                        }
                    }
                );
            });
        } catch (err) {
            console.error("Error inserting word pair to database", err);
            throw new Error("Unable to insert word pair into database");
        }

    },

    /**
     * Finds a word pair by its ID.
     * @param {(string|number)} id - The ID of the word pair to find.
     * @returns {Promise<Object|null>} Resolves with the word pair object if found, 'null' if not found.
     */
    async findById(id) {
        console.info(`Finding word pair by id ${id}...`);
        try {
            return new Promise((resolve, reject) => {
                db.get(`SELECT * FROM Wordpairs WHERE id = ?`, [id], (err, row) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    console.info(`Wordpair with id ${id} found!`);
                    resolve(row);
                });
            });
        } catch (err) {
            console.error(`Error finding word pair by id ${id}: `, err);
            throw new Error("Unable to find word pair by id");
        }
    },

    /**
     * Updates a word pair by its ID with new data.
     * @param {(string|number)} id - The ID of the word pair to update.
     * @param {Object} data - The updated data for the word pair.
     * @returns {Promise<void>} Resolves when the word pair is updated.
     */
    async updateById(id, data) {
        console.info(`Updating word pair by id...${id}`);
        try {
            return new Promise((resolve, reject) => {
                const query = `UPDATE Wordpairs SET english = ?, finnish = ?, swedish = ?, tags = ? WHERE id = ?`;
                db.run(query, [data.english, data.finnish, data.swedish, data.tags, id], (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    console.info(`Word pair updated`);
                    resolve();
                })
            });
        } catch (err) {
            console.error(`Error updating word pair by id ${id}: `, err);
            throw new Error(`Unable to update word pair by id ${id}`);
        }
    },

    /**
     * Retrieves all word pairs from the 'Wordpairs' table.
     * @returns {Promise<Array>} Resolves with an array of all word pairs in the database.
     */
    async findAll() {
        console.info(`Getting all word pairs...`);
        try {
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
        } catch (err) {
            console.error("Error finding all word pairs: ", err);
            throw new Error("Unable to find all word pairs");
        }
    },

    /**
     * Finds all word pairs filtered by tag ID.
     * @param {(string|number)} tagId - The tag ID to filter word pairs by.
     * @returns {Promise<Array>} Resolves with an array of filtered word pair objects.
     */
    async findAllFiltered(tagId) {
        console.info(`Filtering all by tag ${tagId}`);
        try {
            const allWords = await this.findAll();
            let filteredWords = allWords.filter(wordpair => {
                if (!wordpair.tags) return false;
                const tagArr = wordpair.tags.split(',');
                return tagArr.includes(tagId);
            });
            return filteredWords;
        } catch (err) {
            console.error("Error filtering word pairs: ", err);
            throw new Error("Unable to find filtered word pairs");
        }
    },

    /**
     * Deletes a word pair from the 'Wordpairs' table by its ID.
     * @param {(string|number)} id - The ID of the word pair to delete.
     * @returns {Promise<void>} Resolves when the word pair is deleted.
     */
    async deleteById(id) {
        console.info("Deleting word pair...");
        try {
            return new Promise((resolve, reject) => {
                db.run(`DELETE FROM Wordpairs WHERE id = ?`, [id], (err, row) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(row);
                    console.info("Word pair deleted!");
                });
            });
        } catch (err) {
            console.error(`Error deleting word pair by id ${id}: `, err);
            throw new Error("Unable to delete word pair by id");
        }

    },

    /**
     * Closes the word pair database connection.
     */
    close() {
        db.close();
    }
}

module.exports = dbFunctions;