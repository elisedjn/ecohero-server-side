const express      = require('express');
const app          = express();
const mongoose     = require('mongoose');
const path         = require('path');
require('./config/database.config')
const logger       = require('morgan');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);
require('dotenv').config();
const cors         = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');

app.use(
  session({
    secret: 'my-secret-weapon',
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000, //60 sec * 60 min * 24hrs = 1 day (in milliseconds)
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      //time to live (in seconds)
      ttl: 60 * 60 * 24,
      autoRemove: 'disabled',
    }),
  })
);

// Middleware Setup
app.use(logger('dev'));
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

//Register routes
const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

//User routes
const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes)

// app.use((req, res, next) => {
// //If no routes match, send them the React HTML.
// res.sendFile(__dirname + "/public/index.html");
// });

//Start the server to begin listening on a port
// make sure you don't run it on port 3000 because 
// your react app uses port 3000. 
app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
  console.log('Server is running')
})
