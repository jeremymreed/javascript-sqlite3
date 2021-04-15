const sqlite3 = require('sqlite3');
const { open } = require('sqlite');


const seedDatabase = async function (db) {
  await db.exec('INSERT INTO test (name) VALUES ("Foo Bar")');
}

open({
  filename: 'data/foo',
  driver: sqlite3.Database
}).then((db) => {
  seedDatabase(db)
    .then(() => {
      console.log('Seeded the database!');
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
