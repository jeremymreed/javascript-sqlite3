const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

class Database {
  static async openDb () {
    return await open({
      filename: 'data/foo.sqlite3',
      driver: sqlite3.Database
    });
  }
}

module.exports = Database;
