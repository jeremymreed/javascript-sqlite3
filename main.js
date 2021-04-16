const sqlite3 = require('sqlite3');
const { open } = require('sqlite');


const getAllRows = async function (db) {
  let rows = await db.all('SELECT * FROM test WHERE name="Foo Bar"');

  return rows;
}

const testDatabase = async function (db) {
  let allRows = await getAllRows(db);

  console.log('allRows: ', allRows);
}

open({
  filename: 'data/foo.sqlite3',
  driver: sqlite3.Database
}).then((db) => {
  testDatabase(db)
    .then(() => {
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
