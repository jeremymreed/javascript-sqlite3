const sqlite3 = require('sqlite3');
const { open } = require('sqlite');


const setupDatabase = async function (db) {
  await db.exec('CREATE TABLE test (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name VARCHAR(64))');
};

open({
  filename: 'data/foo',
  driver: sqlite3.Database
}).then((db) => {
  setupDatabase(db)
    .then(() => {
      console.log('Database setup complete');
      db.close()
        .then(() => {
          console.log('Closed the database');
        })
        .catch((error) => {
          console.log('Caught error while closing! ', error)
        });
    })
    .catch(() => {
      console.log('Caught error');
    });
});
