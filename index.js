const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo').default;




// cookie parser
app.use(express.urlencoded());
app.use(cookieParser());
// setting up the static files ex: css, js
app.use(express.static('./assets'));
// using express ejs layouts
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// configuring the session
app.use(session({
    name: "code-social",
    secret: 'randomword',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 100
    },
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost/code-social_development",
        autoRemove: 'disabled',
        mongoOptions: {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    }, function (err) {
        if (err) {
            console.log(err || "Connect mongo is running");
        }
    })
}));
// middleware for combining passport and epress sessions
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});