const express = require("express");

const createDB = require('./config/createDB');
const seedDB = require('./config/seedDB');


const syncDatabase = async () => {
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

// Instantiate express application
const app = express();

const configureApp = async () => {
  // handle request data
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Mount apiRouter
  const apiRouter = require("./routes/index");
  app.use("/api", apiRouter);

  // handle page not found
  app.use((req, res, next) => {
    const error = new Error("Not Found, Please Check URL!");
    error.status = 404;
    next(error);
  });

  // Error-handling middleware 
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });

};

const bootApp = async () => {
  await syncDatabase();
  await configureApp();
};

bootApp();


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on ${PORT}`));

