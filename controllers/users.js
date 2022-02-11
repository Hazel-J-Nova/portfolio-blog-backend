module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

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
  req.flash("success", "Goodbye!");
  res.redirect("/");
};

module.exports.renderResetPassword = (req, res) => {
  res.render("users/resetPassword");
};

module.exports.resetPassword = async (req, res, next) => {
  try {
    const { userName } = req.body;
    const user = await User.findOne({ username: userName });
    if (!user) {
      req.flash("error", "sorry there is no user with that name");
      res.redirect("/");
    }
    let htmlTemplate = fs.readFileSync(resetEmailPath, "utf8");
    htmlTemplate = htmlTemplate
      .replace("username", userName)
      .replace(
        "registerLink",
        `https://www.knockouttalent/api/${user._id}/${user.token}`
      );
    let email = "knockout.talent.models@gmail.com";

    let params = buildParams(
      email,
      "Reset your password",
      htmlTemplate,
      htmlTemplate
    );
    sendEmail(params);
    req.flash("success", "please check your email");
    res.redirect("/");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/");
  }
};

module.exports.renderPasswordResetForm = (req, res) => {
  const params = req.params;
  res.render("users/passwordResetForm", { params });
};

module.exports.passwordResetForm = async (req, res) => {
  const newPassword = req.body.password;
  const userName = req.body.userName;

  const { token } = req.params;
  const user = await User.findOne({ username: userName });
  if (!user || userName !== user.username || user.token !== token || !token) {
    req.flash("error", "sorry no user with that Id");
    res.redirect("/");
  }
  user.setPassword(req.body.password);
  user.token = "";
  req.flash("success", "password updated");
  res.redirect("/user/login");
};

module.exports.userProfile = async (req, res) => {
  const { userName } = req.params;
  const currentUser = await User.findOne({ username: userName });

  const creator = await Creator.findOne({ user: currentUser.id })
    .populate("content")
    .populate("categories");
  res.render("users/profile", { creator, currentUser });
};

module.exports.updateUserProfileForm = async (req, res) => {
  res.render("users/updateProfile");
};

module.exports.updateUserProfile = async (req, res) => {
  let { userName } = req.params;
  const currentUser = await User.findOne({ username: userName });
  const creator = await Creator.findOne({ user: currentUser.id });
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));

  await creator.avatar.push(...imgs);
  await creator.save();
  res.redirect(`user/${userName}`, currentUser);
};
