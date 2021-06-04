const express = require("express");
const env = require("./config/environment");

const logger = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
require("./config/view-helper")(app);

const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");

const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");
const passportLocal = require("./config/passport-local-strategy");
const passportGoogle = require("./config/passport-google-strategy");

const path = require("path");

const MongoStore = require("connect-mongo").default;
const sassMiddleware = require("node-sass-middleware");

const flash = require("connect-flash");
const customMware = require("./config/middleware");

// setting up a server for the chatting engine
const chatServer = require("http").Server(app);
const chatSocket = require("./config/chat_socket").chatSocket(chatServer);
chatServer.listen(5000);
console.log("chat server is listening to port 5000");

if (env.name == "development") {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.asset_path, "scss"),
      dest: path.join(__dirname, env.asset_path, "css"),
      debug: true,
      outputStyle: "extended",
      prefix: "/css",
    })
  );
}
// cookie parser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// setting up the static files ex: css, js
app.use(express.static(env.asset_path));
// amking the  multer files available to the /uploads
app.use("/uploads", express.static(__dirname + "/uploads"));
// using express ejs layouts
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");
// configuring the session
app.use(
  session({
    name: "code-social",
    secret: env.session_cookie_key,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/code-social_development",
        autoRemove: "disabled",
        mongoOptions: {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        },
      },
      function (err) {
        if (err) {
          console.log(err || "Connect mongo cookie session is running");
        }
      }
    ),
  })
);

// middleware for combining passport and epress sessions
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// using flash after sessions , flash uses sessions to show notifications
app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use("/", require("./routes"));

app.use(logger(env.morgan.mode, env.morgan.options));
// set up the view engine

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
