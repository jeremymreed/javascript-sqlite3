const sqlite3 = require('sqlite3');
const { open } = require('sqlite');


const seedDatabase = async function (db) {
  await db.exec('INSERT INTO test (name) VALUES ("Foo Bar")');

  await db.exec('INSERT INTO foo (nameID, type) VALUES (1, "DAMN SQL BULLSHIT")')
}

open({
  filename: 'data/foo.sqlite3',
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
    .catch((err) => {
      console.log('Caught error: ', err);
    });
});
