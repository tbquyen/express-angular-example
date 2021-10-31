const Users = require("./src/models").Users;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("passport-jwt");
const log4js = require("log4js");
const db = require("./src/models");
const express = require("express");
const passport = require("passport");
require("dotenv").config();

/** congif log */
log4js.configure({
  appenders: {
    out: { type: "stdout" },
    system: {
      type: "file",
      filename: "logs/system.log",
      maxLogSize: 10485760,
      backups: 1,
      compress: true,
    },
    errors: {
      type: "file",
      filename: "logs/errors.log",
      maxLogSize: 10485760,
      backups: 1,
      compress: true,
    },
    access: {
      type: "file",
      filename: "logs/access.log",
      maxLogSize: 10485760,
      backups: 1,
      compress: true,
    },
    fileSystem: { type: "logLevelFilter", appender: "system", level: "all" },
    fileErros: { type: "logLevelFilter", appender: "errors", level: "error" },
  },
  categories: {
    default: { appenders: ["out", "fileSystem", "fileErros"], level: "all" },
    access: { appenders: ["out", "access"], level: "all" },
    mongoose: { appenders: ["out", "fileSystem"], level: "all" },
  },
});

const app = express();
const log = log4js.getLogger();

/** setting log */
app.use(
  log4js.connectLogger(log4js.getLogger("access"), {
    level: "auto",
    context: true,
    format: (req, res, format) =>
      format(
        `:referrer :remote-addr :method :url => status/:status HTTP/:http-version :user-agent`
      ),
  })
);

// production: origin: uri
app.use(cors({ origin: process.env.APP_ORIGIN, credentials: true }));
// app.use(fileupload());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

/** Passport authenticate */
passport.use(
  "jwt",
  new jwt.Strategy(
    {
      // get token from signedCookies
      jwtFromRequest: function (req, res) {
        if (req && req.signedCookies) {
          return req.signedCookies[process.env.JWT_COOKIE];
        }
        return null;
      },
      secretOrKey: process.env.JWT_SECRET,
    },
    async function (jwt_payload, done) {
      const data = await Users.findOne({ username: jwt_payload.username })
        .exec()
        .catch();
      if (!data || data.expired) {
        return done(null, false);
      }
      return done(null, data);
    }
  )
);

/** connect to the database */
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DOMAIN}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
db.mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    log.debug(`Connected to ${uri}`);
  })
  .catch((err) => {
    log.error(`Cannot connect to ${uri}:`, err);
    process.exit();
  });

const API = `${process.env.APP_API}` || "api";
app.use(`/${API}`, require("./src/routes"));

/** catch 404 and forward to error handler */
app.use(function (req, res, next) {
  res.status(404);
  res.send("page not found!");
});

/** error handler */
app.use(function (err, req, res, next) {
  log.error(err);
  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

/** set port, listen for requests */
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  log.debug(`Server is running on port ${PORT}.`);
});
