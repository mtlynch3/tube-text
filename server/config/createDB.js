const pgtools = require('pgtools');

const config = {
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'pgpwd'
  };
  
  const dbName = require('./dbName');
  
  //attempt to create DB
  //if it already exists, this does nothing and just connects to
  //the existing db of that name
  async function createDB() {
      try {
          let res = await pgtools.createdb(config, dbName); //returns a promise
          console.log(res);
          console.log(`Successfully created the database: ${dbName}!`);
        } catch (err) {
          if (err.name === 'duplicate_database') {
              console.log(`Database ${dbName} already exists`);
              return;
            } else {
              console.error(err);
              process.exit(1);
            }
        }
  }

  module.exports = createDB;