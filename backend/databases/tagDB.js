const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const tagDBFunctions = {
    /**
     * Initializes the tag database by creating the 'Tags' table if it doesn't exist
     * and inserts default tags if the table is empty.
     * @returns {Promise<void>} Resolves when the initialization is done.
     */
    async initialize() {
        try {
            console.info("Initializing tag database...");
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
            // Insert default tags if the table is empty
            if (rowCount === 0) {
                await this.insert("color");
                await this.insert("animal");
                await this.insert("vehicle");
                await this.insert("food");
                await this.insert("fruit");
                await this.insert("country");
            }

        } catch (err) {
            console.error("Error initializing tag database: ", err);
        }
    },
    /**
     * Inserts a new tag into the 'Tags' table.
     * @param {string} tagName - The name of the tag to insert.
     * @returns {Promise<void>} Resolves when the tag is successfully inserted.
     */
    async insert(tagName) {
        console.info(`Inserting tag "${tagName}" into database...`);
        try {
            return new Promise(async (resolve, reject) => {
                // Insert data
                db.run(`INSERT INTO Tags(name) VALUES (?)`,
                    [tagName], (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            console.info(`Tag "${tagName}" inserted successfully.`);
                            resolve();
                        }
                    }
                );
            });
        } catch (err) {
            console.error("Error inserting tag to database: ", err);
            throw new Error("Unable to insert tag into database");
        }
    },
    /**
    * Finds a tag by its ID from the 'Tags' table.
    * @param {(string|number)} id - The ID of the tag to find.
    * @returns {Promise<Object|null>} Resolves with the tag object if found, or 'null' if not found.
    */
    async findById(id) {
        console.info(`Finding tag by id...${id}`);
        try {
            return new Promise((resolve, reject) => {
                db.get(`SELECT * FROM Tags WHERE id = ?`, [id], (err, row) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    console.info(`Tag with id ${id} found!`);
                    resolve(row);
                });
            });
        } catch (err) {
            console.error(`Error finding tag by id ${id}: `, err);
            throw new Error("Unable to find tag by id");
        }

    },
    /**
     * Updates a tag by its ID with a new name.
     * @param {(string|number)} id - The ID of the tag to update.
     * @param {string} name - The new name for the tag.
     * @returns {Promise<number>} Resolves when the tag is updated.
     */
    async updateById(id, name) {
        console.info(`Updating tag by id...${id}`);
        try {
            return new Promise((resolve, reject) => {
                const query = `UPDATE Tags SET name = ? WHERE id = ?`;
                db.run(query, [name, id], (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    console.info(`Tag updated`);
                    resolve();
                })
            });
        } catch (err) {
            console.error(`Error updating tag by id ${id}: `, err);
            throw new Error(`Unable to update tag by id ${id}`);
        }
    },
    /**
     * Retrieves all tags from the `Tags` table.
     * @returns {Promise<Array>} Resolves with an array of all tag objects in the database.
     */
    async findAll() {
        console.info(`Getting all tags...`);
        try {
            return new Promise(async (resolve, reject) => {
                // Query data
                db.all('SELECT * FROM Tags', [], (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                    console.info("Tags fetched!");
                });
            });
        } catch (err) {
            console.error("Error finding all tags: ", err);
            throw new Error("Unable to find all tags");
        }
    },

    /**
     * Deletes a tag from the `Tags` table by its ID.
     * @param {(string|number)} id - The ID of the tag to delete.
     * @returns {Promise<void>} Resolves when the tag is deleted.
     */
    async deleteById(id) {
        console.info("Deleting tag...");
        try {
            return new Promise((resolve, reject) => {
                db.run(`DELETE FROM Tags WHERE id = ?`, [id], (err, row) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                    console.info("Tag deleted!");
                });
            });
        } catch (err) {
            console.error(`Error deleting tag by id ${id}: `, err);
            throw new Error("Unable to delete tag by id");
        }
    },

    /**
     * Closes the tag database connection.
     */
    close() {
        db.close();
    },
}

module.exports = tagDBFunctions;