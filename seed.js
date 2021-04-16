const { v4: uuidv4 } = require('uuid');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');


const seedDatabase = async function (db) {
  let nameID = uuidv4();

  await db.run('INSERT INTO test (nameID, name) VALUES (?, "Foo Bar")', nameID);

  await db.run('INSERT INTO foo (nameID, type) VALUES (?, "DAMN SQL BULLSHIT")', nameID)
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
