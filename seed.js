const Database = require('./Database');

const seedDatabase = async function (db) {
  let templateId0 = '3a12bc10-f90d-42b3-a32f-ed9d3500731fj'
  let templateId1 = 'eb877655-f5ed-449c-bd58-4db34dca2d17';

  let instanceId0 = '8bcb9c54-4966-4b7f-8ad8-6aa9340cf54c';
  let instanceId1 = '39879c5d-7eb2-4024-b686-6d4c3fbfbbe1';

  // Prices in cents.  Dinero.js will want its input this way.
  let price0 = 150;
  let price1 = 200;

  let start = 1551398400000;
  let end = 1551498400000;
  let purchaseDate = 1551398400000;

  await db.run(' \
    INSERT INTO item_templates \
    ( \
      templateId, \
      make, \
      model \
    ) \
    VALUES \
    ( \
      ?, \
      "Crest", \
      "Toothpaste" \
    )',
    templateId0
  );

  await db.run(' \
    INSERT INTO item_templates \
    ( \
      templateId, \
      make, \
      model \
    ) \
    VALUES \
    ( \
      ?, \
      "Ragu", \
      "Vodka Sauce" \
    )',
    templateId1
  );

  await db.run('INSERT INTO item_instances \
    ( \
      instanceId, \
      templateId, \
      source, \
      price, \
      start, \
      end, \
      purchaseDate \
    ) \
    VALUES \
    ( \
      ?, \
      ?, \
      "Target", \
      ?, \
      ?, \
      ?, \
      ? \
    )',
    instanceId0,
    templateId0,
    price0,
    start,
    end,
    purchaseDate
  );

  await db.run('INSERT INTO item_instances \
    ( \
      instanceId, \
      templateId, \
      source, \
      price, \
      start, \
      end, \
      purchaseDate \
    ) \
    VALUES \
    ( \
      ?, \
      ?, \
      "Wegmans", \
      ?, \
      ?, \
      ?, \
      ? \
    )',
    instanceId1,
    templateId0,
    price1,
    start,
    end,
    purchaseDate
  );
}

Database.openDb().then((db) => {
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
