const Database = require('./Database');

const getAllItemTemplates = async function (db) {
  return await db.all('SELECT * FROM item_templates');
}

const getAllItemInstances = async function (db) {
  return await db.all('SELECT * FROM item_instances');
}

const getAllItems = async function (db) {
  return await db.all('SELECT * FROM item_instances INNER JOIN item_templates ON item_instances.templateId = item_templates.templateId');
}

const testDatabase = async function (db) {
  let allItemTemplates = await getAllItemTemplates(db);
  let allItemInstances = await getAllItemInstances(db);
  let allItems = await getAllItems(db);

  console.log('allItemTemplates: ', allItemTemplates);
  console.log('allItemInstances: ', allItemInstances);
  console.log('allItems: ', allItems);
}

Database.openDb().then((db) => {
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
