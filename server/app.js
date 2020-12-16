const express = require('express');
const pgtools = require('pgtools');

const config = {
  user: 'melissalynch',
  host: 'localhost',
  port: 5432,
  password: 'mlynch'
};

const dbName = require('./config/dbName');

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

async function testDB(db) {
    try {
        await db.authenticate(); //returns a promise
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

async function bootApp() {
    await createDB();
    const db = require('./config/database'); //new Sequelize
    await testDB(db);
}

bootApp();

const app = express();

app.get('/', (req, res) => res.send('INDEX'));

//Note route
app.use('/notes', require('./routes/notes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
