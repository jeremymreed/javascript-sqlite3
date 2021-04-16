const sqlite3 = require('sqlite3');
const { open } = require('sqlite');


const setupDatabase = async function (db) {
  await db.exec('CREATE TABLE test (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nameID VARCHAR(32), name VARCHAR(64))');

  await db.exec('CREATE TABLE foo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nameID VARCHAR(32), type VARCHAR(64), FOREIGN KEY (nameID) REFERENCES test(nameID))');
};

open({
  filename: 'data/foo.sqlite3',
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
    .catch((err) => {
      console.log('Caught error: ', err);
    });
});
