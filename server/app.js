//database setup
const createDB = require('./configDB/createDB');
const seedDB = require('./configDB/seedDB');

// Instantiate express application
const express = require("express");
const app = express();

//user auth
//Express Session - Sequelize store
const session = require('express-session');
// initalize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//module dependencies
const passport = require("passport");
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//serialize, deserialize user
require('./auth/passport')(passport);

const syncDatabase = async (db) => {
  //sync and seed
  try {
    await db.sync({force: true});
    console.log('------Synced to db--------')
    await seedDB();
    console.log('--------Successfully seeded db--------');
  } catch (error) {
    console.error('syncDB error:', error);
  }  
}

const configureApp = async (db) => {
  // handle request data
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  //allow flash messages from passport
  app.use(cookieParser());
  app.use(flash());
  app.use(cors());

  // auth - Express Session
  const sessionStore = new SequelizeStore({
    db: db,
  });
  app.use(
    session({
      secret: "super secret key to encrypt and sign the cookie",
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  );
  sessionStore.sync();
  
  //auth - passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  //mount authRouter
  const authRouter = require("./auth/authRouter");
  app.use("/auth", authRouter);

  // Mount apiRouter
  const apiRouter = require("./routes/index");
  app.use("/api", apiRouter);

  // handle page not found
  app.use((req, res, next) => {
    const error = new Error("Not Found, Please Check URL!");
    console.log(req.path);
    error.status = 404;
    next(error);
  });

  // Error-handling middleware 
  app.use((err, req, res, next) => {
    console.error(err);
    console.log(req.originalUrl);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });

};

const bootApp = async () => {
  await createDB();
  const db = require('./configDB/database'); //new Sequelize
  await syncDatabase(db);
  await configureApp(db);
};

bootApp();


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on ${PORT}`));

