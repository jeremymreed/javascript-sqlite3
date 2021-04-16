const sqlite3 = require('sqlite3');
const { open } = require('sqlite');


const testDatabase = async function (db) {
  let row = await db.all('SELECT * FROM test WHERE name="Foo Bar"');

  return row;
}

open({
  filename: 'data/foo',
  driver: sqlite3.Database
}).then((db) => {
  testDatabase(db)
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
