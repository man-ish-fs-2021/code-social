const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname,"../productionLogs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log",{
    interval:"1d",
    path: logDirectory
});







const development = {


    name: "development",
    asset_path: "/assets",
    session_cookie_key: "randomword",
    db: "codesocial_development",
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "nodetest587",
            pass: "q1w2e3r4t5y^"
        },
        tls: {
            rejectUnauthorized: false
        }
    },
    google_clientID: "725720623961-d15qgr5t9mo3br6b2r8hn30370d1o7on.apps.googleusercontent.com",
    google_clientSecret: "U1F77xC1KtBVUKDJ-t5bVtT7",
    google_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'code-social',
    morgan: {
        mode:'dev',
        options : {stream: accessLogStream}
    }


}


const production = {
    name: "production",
    asset_path: process.env.CODESOCIAL_ASSET_PATH,
    session_cookie_key: process.env.CODESOCIAL_SESSION_COOKIEKEY,
    db: process.env.CODESOCIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODESOCIAL_GMAIL_USERNAME,
            pass: process.env.CODESOCIAL_GMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    },
    google_clientID: process.env.CODESOCIAL_GOOGLE_CLIENT_ID,
    google_clientSecret: process.env.CODESOCIAL_GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.CODESOCIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODESOCAIL_JWT_SECRET,
    morgan: {
        mode:'combined',
        options : {stream: accessLogStream}
    }
}

module.exports = eval(process.env.CODESOCIAL_ENVIRONMENT)== undefined ? development : eval(process.env.CODESOCIAL_ENVIRONMENT);