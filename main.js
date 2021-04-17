const Database = require('./Database');

const getAllRows = async function (db) {
  let rows = await db.all('SELECT * FROM test WHERE name="Foo Bar"');

  return rows;
}

const testJoins = async function (db) {
  let joinResult = await db.get('SELECT * FROM foo INNER JOIN test ON test.nameID = foo.nameID WHERE foo.type="DAMN SQL BULLSHIT"');

  return joinResult;
}

const getAllRowsFromFooWithSameNameID = async function (db) {
  let nameID = '3a12bc10-f90d-42b3-a32f-ed9d3500731fj';
  let joinSameNameIDResult = await db.all('SELECT * FROM foo INNER JOIN test ON test.nameID = foo.nameID where foo.nameID = ?', nameID);

  return joinSameNameIDResult;
}

const getAllRowsJoinedByNameID = async function (db) {
  let joinAllRowsByNameIDResult = await db.all('SELECT * FROM foo INNER JOIN test ON test.nameID = foo.nameID');

  return joinAllRowsByNameIDResult;
}

const testDatabase = async function (db) {
  let allRows = await getAllRows(db);
  let joinResult = await testJoins(db);
  let joinSameNameIDResult = await getAllRowsFromFooWithSameNameID(db);
  let joinAllRowsByNameIDResult = await getAllRowsJoinedByNameID(db);

  console.log('allRows: ', allRows);
  console.log('joinResult: ', joinResult);
  console.log('joinSameNameIDResult: ', joinSameNameIDResult);
  console.log('joinAllRowsByNameIDResult: ', joinAllRowsByNameIDResult);
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
