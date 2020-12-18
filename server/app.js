const express = require('express');
const pgtools = require('pgtools');

const seedDB = require('./config/seedDB');

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

async function bootApp() {
    await createDB();
    const db = require('./config/database'); //new Sequelize
    //sync and seed
    try {
      await db.sync({force: true});
      await seedDB();
      console.log('Successfully seeded database')
    } catch (error) {
      console.error('syncDB error:', error);
    }

    
}

bootApp();

const app = express();

const apiRouter = require('./routes/index');

app.use('/api', apiRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
