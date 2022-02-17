module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Knockout Talent!");
      res.json(req.user);
    });
  } catch (e) {
    res.json(e);
  }
};

module.exports.login = (req, res) => {
  res.json(req.user);
};

module.exports.logout = (req, res) => {
  req.logout();
  // req.session.destroy();
  res.json("/");
};

// module.exports.resetPassword = async (req, res, next) => {
//   try {
//     const { userName } = req.body;
//     const user = await User.findOne({ username: userName });
//     if (!user) {
//       req.flash("error", "sorry there is no user with that name");
//       res.json("/");
//     }
//     let htmlTemplate = fs.readFileSync(resetEmailPath, "utf8");
//     htmlTemplate = htmlTemplate
//       .replace("username", userName)
//       .replace(
//         "registerLink",
//         `https://www.knockouttalent/api/${user._id}/${user.token}`
//       );
//     let email = "knockout.talent.models@gmail.com";

//     let params = buildParams(
//       email,
//       "Reset your password",
//       htmlTemplate,
//       htmlTemplate
//     );
//     sendEmail(params);
//     req.flash("success", "please check your email");
//     res.json("/");
//   } catch (e) {
//     req.flash("error", e.message);
//     res.json("/");
//   }
// };

module.exports.passwordResetForm = async (req, res) => {
  const newPassword = req.body.password;
  const userName = req.body.userName;

  const { token } = req.params;
  const user = await User.findOne({ username: userName });
  if (!user || userName !== user.username || user.token !== token || !token) {
    req.flash("error", "sorry no user with that Id");
    res.json("/");
  }
  user.setPassword(req.body.password);
  user.token = "";
  req.flash("success", "password updated");
  res.json("/user/login");
};

module.exports.userProfile = async (req, res) => {
  const { userName } = req.params;
  const currentUser = await User.findOne({ username: userName });
};
