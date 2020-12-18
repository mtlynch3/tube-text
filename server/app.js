const express = require('express');


const createDB = require('./config/createDB');
const seedDB = require('./config/seedDB');


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
