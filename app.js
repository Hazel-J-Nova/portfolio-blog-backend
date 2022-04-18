if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const dbUrl = process.env.MONGO_CONNECT;
const admin = require("./routes/admin");
const users = require("./routes/users");
const session = require("express-session");
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/catchAsync");
// const User = require("./Models/Users");
// const Blog = require("./Models/Blogs");
// const mongoSanatize = require("express-mongo-sanitize");

// const cors = require("cors");

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
app.use(bodyParser.json());
const secret = process.env.SECRET || "thisshouldbeabettersecret";

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
});

// app.use(
//   session({
//     secret: secret,
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//       httpOnly: true,
//       // secure: true,
//       expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//       maxAge: 1000 * 60 * 60 * 24 * 7,
//     },
//     store: store,
//   })
// );

// store.on("error", function (e) {
//   console.log("SESSION STORE ERROR", e);
// });
// app.use(mongoSanatize);

// app.use(
//   cors({
//     origin: "*",
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   next();
// });

// app.use("/admin", admin);
// app.use("/users", users);

app.get("/", (req, res) => {
  res.json("hello");
});

// app.all("*", (req, res, next) => {
//   next(new ExpressError("Page Not Found", 404));
// });

// app.use((err, req, res, next) => {
//   const { statusCode = 500 } = err;
//   if (!err.message) err.message = "Oh No, Something Went Wrong!";
//   res.status(statusCode).render("error", { err });
// });

const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
