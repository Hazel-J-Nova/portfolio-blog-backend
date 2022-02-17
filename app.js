const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const dbUrl = "mongodb://localhost:27017/caesurablog";
const admin = require("./routes/admin");
const users = require("./routes/users");
const session = require("express-session");
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/catchAsync");
const User = require("./Models/Users");
const Blog = require("./Models/Blogs");

const cors = require("cors");

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("database connected");
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

const secret = "thisshouldbeabettersecret";

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
});

app.use(
  session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      // secure: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: store,
  })
);

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

app.use(
  cors({
    origin: "*",
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/admin", admin);
app.use("users", users);

app.get("/", async (req, res) => {
  const user = req.user;
  if (user) {
    res.json(user);
  }
  res.json("aaaaa");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("page not found", "404"));
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "something went wrong";
  res.status(status).json(status);
});

const port = 4500;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
