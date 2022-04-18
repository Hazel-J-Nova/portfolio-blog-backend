const mongoose = require("mongoose");
const Blog = require("../Models/Blogs");
const PortfolioItems = require("../Models/PortfolioItems");
const Comment = require("../Models/Comments");
const { sendEmail } = require("../utils/email");
require("dotenv").config();

module.exports.postBlog = async (req, res) => {
  let blog = JSON.parse(JSON.stringify(req.body));
  blog.tags = blog.tags.split(",");
  const newBlog = await new Blog(blog);
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  newBlog.img = imgs[0];
  await newBlog.save();
  res.json("success");
};

module.exports.getBlogs = async (req, res) => {
  let allBlogs = await Blog.find({}).populate("comments").sort({ date: -1 });

  res.json(allBlogs);
};

module.exports.getIndvidualBlog = async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId);
  console.log(blog);

  res.json(blog);
};

module.exports.deleteBlog = async (req, res) => {
  const { blogId } = req.params;
  const blog = await findById(blogId);
  for (let comment of blog.comments) {
    await Comment.findByIdAndDelete(comment._id);
  }
  await Blog.findByIdAndDelete(blogId);
  res.json({ deletedBlog: blog });
};

module.exports.editBlog = async (req, res) => {
  const { blogId } = await req.params;
  const editedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
    runValidators: true,
  });
  await editedBlog.save();
  res.json({ editedBlog });
};

module.exports.addPortfolioItem = async (req, res) => {
  const portfolioItem = req.body;
  const newPortfolioItem = await new PortfolioItems(portfolioItem);
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  newPortfolioItem.img = imgs[0];

  await portfolioItem.save();
  res.json("success");
};

module.exports.getPorfolioItems = async (req, res) => {
  const allPortfolioItems = await PortfolioItems.find({});
  res.json(allPortfolioItems);
};

module.exports.getIndvidualPorfolioItems = async (req, res) => {
  const portfolioId = req.params;
  const portfolioItem = await PortfolioItems.findById(portfolioId);
  res.json(portfolioItem);
};

module.exports.deletIndvidualPortfolioItem = async (req, res) => {
  const portfolioItemToDelete = await PortfolioItems.findByIdAndDelete();
};

module.exports.editIndividualPortfolioItem = async (req, res) => {
  const { portfolioId } = req.parms;
  const portfolioItem = await PortfolioItems.findByIdAndUpdate(
    portfolioId,
    req.body,
    { runValidators: true }
  );
  res.json(portfolioItem);
};

module.exports.addComment = async (req, res) => {
  const { blogId } = req.params;
  const comment = JSON.parse(JSON.stringify(req.body));
  const newComment = await new Comment(comment);
  const blog = await Blog.findById(blogId);
  blog.comment.push(newComment);
  await newComment.save();
  await blog.save();
  res.json("succes");
};

module.exports.getAllComments = async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId).populate("comments");
  const comments = blog.comments;
  if (comments) {
    res.json(comments);
  }
};

module.exports.editComment = async (req, res) => {
  const { commentId } = req.params;
  const commenttoEdit = await Comment.findByIdAndUpdate(commentId, req.body, {
    runValidators: true,
  });
  await commenttoEdit.save();
  res.json(commenttoEdit);
};

module.exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const { blogId } = req.params;
  const CommentToDelete = await Comment.findByIdAndDelete(commentId);
  const blog = await Blog.findById({ blogId });
  const commentIndex = blog.comments.find((element) => element === commentId);
  blog.comments.splice(commentIndex);
  await blog.save();
};

module.exports.email = async (req, res) => {
  console.log(process.env.EMAIL_PASSWORD);
  const emailData = req.body;
  let emailOptions = {
    from: '"Hazel Tate" <Hazel.Tate@caesura.dev>',
    to: "Hazel.Tate@caesura.dev",
    subject: `portfolio email from ${emailData.emailAddress}, \n
    ${emailData.subject}`,
    text: emailData.message,
    html: "",
  };
  sendEmail(emailOptions);
};
