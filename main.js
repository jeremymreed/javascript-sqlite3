const sqlite3 = require('sqlite3');
const { open } = require('sqlite');


const test = async function (db) {
  await db.exec('CREATE TABLE test (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name VARCHAR(64))');

  await db.exec('INSERT INTO test (name) VALUES ("Foo Bar")');

  let row = await db.get('SELECT * FROM test WHERE name="Foo Bar"');

  return row;
}

open({
  filename: 'data/foo',
  driver: sqlite3.Database
}).then((db) => {
  test(db)
    .then((row) => {
      console.log('Returned row: ', row);
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
