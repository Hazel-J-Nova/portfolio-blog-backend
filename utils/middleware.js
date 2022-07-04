const Comment = require('../Models/Comments');

module.exports.checkAdmin = async (req, res, next) => {
  const user = req.user;
  if (!req.user.admin) {
    res.json({ error: 'You do not have permission to do that' });
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const user = req.user;
  const { commentId } = req.params;
  const comment = await Comment.findById();
  if (user._id !== comment.user) {
    res.json({ error: 'you do not have permission to do that' });
  }
  next();
};

module.exports.isUser = async (req, res, next) => {
  if (!req.user) {
    res.json({ error: 'You must be logged in to do that' });
  }
  next();
};

module.exports.checkAdmin = async (req, res, next) => {
  if (!req.user.admin) {
    res.json({ error: 'not admin' });
  }
};
