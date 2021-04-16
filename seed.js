const { v4: uuidv4 } = require('uuid');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');


const seedDatabase = async function (db) {
  let nameID0 = '3a12bc10-f90d-42b3-a32f-ed9d3500731fj'
  let nameID1 = '6e487079-fa00-47e2-ba65-1da4ac7a1acc';
  let nameID2 = '8bcb9c54-4966-4b7f-8ad8-6aa9340cf54c';

  await db.run('INSERT INTO test (nameID, name) VALUES (?, "Foo Bar")', nameID0);
  await db.run('INSERT INTO test (nameID, name) VALUES (?, "Another name")', nameID1);
  await db.run('INSERT INTO test (nameID, name) VALUES (?, "NULL")', nameID2);

  await db.run('INSERT INTO foo (nameID, type) VALUES (?, "DAMN SQL BULLSHIT")', nameID0);
  await db.run('INSERT INTO foo (nameID, type) VALUES (?, "Foo")', nameID0);
  await db.run('INSERT INTO foo (nameID, type) VALUES (?, "Bar")', nameID0);
  await db.run('INSERT INTO foo (nameID, type) VALUES (?, "Baz")', nameID0);

  await db.run('INSERT INTO foo (nameID, type) VALUES (?, "Fart")', nameID1);
  await db.run('INSERT INTO foo (nameID, type) VALUES (?, "Burp")', nameID1);

  await db.run('INSERT INTO foo (nameID, type) VALUES (?, "Ice Cube")', nameID2);
  await db.run('INSERT INTO foo (nameID, type) VALUES (?, "Taylor Swift")', nameID2);
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
