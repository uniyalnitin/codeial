const express = require("express");
const port = 8000;

const app = express();
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
const sassMiddleware = require("node-sass-middleware");

//Session management
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-statergy");
const passportJwt = require("./config/passport-jwt-statergy");

const flash = require("connect-flash");
const customMiddleware = require("./config/middleware");

// mongo store for saving session data
const MongoStore = require("connect-mongo")(session);

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    prefix: "/css",
    outputStyle: "expanded",
    debug: true,
  })
);

app.use(express.urlencoded());
app.use(express.json());
app.use(expressLayouts);
app.use(express.static("assets"));

// Use mongo store for saving session data
app.use(
  session({
    name: "codeial",
    secret: "random_secret_string",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.error.bind(console, "Error setting up mongo store for session");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleware.setFlash);

// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.error.bind(console, `Cannot run server on port: ${port}`);
    return;
  }
  console.log(`Successfully running server on port: ${port}`);
});
