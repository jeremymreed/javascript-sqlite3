const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('data/foo', (err) => { console.log('Opened database!')});

const data = [];

db.serialize(() => {
  db.exec('CREATE TABLE test (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name VARCHAR(64))');

  db.exec('INSERT INTO test (name) VALUES ("Foo Bar")');

  db.get(
    'SELECT * FROM test WHERE name="Foo Bar"',
    (err, row) => {
      if (err) {
        console.log('err: ', err);
      } else {
        console.log('row: ', row);
        data.push(row);
      }
    }
  );
});
