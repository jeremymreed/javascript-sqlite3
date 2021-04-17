const Database = require('./Database');

const setupDatabase = async function (db) {
  await db.exec('CREATE TABLE test (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nameID VARCHAR(36), name VARCHAR(64))');

  await db.exec('CREATE TABLE foo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nameID VARCHAR(36), type VARCHAR(64), price DECIMAL(16,4), FOREIGN KEY (nameID) REFERENCES test(nameID))');
};

Database.openDb().then((db) => {
  if (db !== undefined) {
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
  } else {
    console.log('db was undefined!');
  }
});
