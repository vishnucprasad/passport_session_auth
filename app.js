require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const db = require("./database/db");
const userRouter = require('./routes/user');
const initializePassport = require('./authentication/passport');
const passport = require("passport");

const app = express();
const port = process.env.PORT;

// Database Connection
db.connect();

// Passport initailazation
initializePassport();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: `${process.env.MONGO_URI}/${process.env.DATABASE_NAME}`,
        ttl: 14 * 24 * 60 * 60
    })
}));
app.use(passport.authenticate('session'));

// Routers
app.use('/', userRouter);

// Error Handlers
app.use((error, req, res, next) => {
    res.status(error.status || 500).json(error);
});

// Serving
app
    .listen(port, () => {
        console.log(`\x1b[32mserver is running on http://localhost:${port}\x1b[0m`);
    })
    .on("error", (error) => {
        console.log("\x1b[31mport " + error.port + " is already in use\x1b[0m");
    });