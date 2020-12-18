const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

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
  // security
  app.use(helmet());
  app.use(logger("dev"));
  // handle request data
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());
  app.use(cookieParser());

  // Mount apiRouter
  const apiRouter = require("./routes/index");
  app.use("/api", apiRouter);

  // Error-handling middleware (404)
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error("Not found");
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // Error-handling middleware (500)
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

