const User = require("../Models/Users");

module.exports.register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await new User({ email, username });
    console.log(user);
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      res.json(req.user);
    });
  } catch (e) {
    console.log("error");
    res.send(e);
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

module.exports.passwordResetForm = async (req, res) => {
  const newPassword = req.body.password;
  const userName = req.body.userName;

  const { token } = req.params;
  const user = await User.findOne({ username: userName });
  if (!user || userName !== user.username || user.token !== token || !token) {
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
  res.json(currentUser);
};
