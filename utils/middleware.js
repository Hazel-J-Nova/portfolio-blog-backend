module.exports.checkAdmin = async (req, res, next) => {
  const user = req.user;
  if (!req.user.admin) {
    res.json({ error: "You do not have permission to do that" });
  }
  next();
};
