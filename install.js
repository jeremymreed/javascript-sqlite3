const Database = require('./Database');

const setupDatabase = async function (db) {
  await db.exec(`CREATE TABLE item_templates (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    templateId VARCHAR(36),
    make VARCHAR(64),
    model VARCHAR(64)
  )`);

  await db.exec(`CREATE TABLE item_instances (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    instanceId VARCHAR(36),
    templateId VARCHAR(36),
    source VARCHAR(64),
    price INTEGER,
    start BIGINT,
    end BIGINT,
    purchaseDate BIGINT,
    FOREIGN KEY (templateId) REFERENCES test(templateId)
  )`);
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
