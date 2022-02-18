const res = require("express/lib/response");
const mongoose = require("mongoose");
const Blog = require("../Models/Blogs");
const PortfolioItems = require("../Models/PortfolioItems");
const Comment = require("../Models/Comments");

module.exports.postBlog = async (req, res) => {
  const blog = JSON.parse(JSON.stringify(req.body));
  const newBlog = await new Blog(blog);
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  newBlog.img = imgs[0];
  await newBlog.save();
  res.json("success");
};

module.exports.getBlogs = async (req, res) => {
  const allBlogs = await Blog.find({}).populate("comments").sort({ date: -1 });
  res.json(allBlogs);
};

module.exports.getIndvidualBlog = async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId);
  console.log(blog);

  res.json(blog);
};

module.exports.addPortfolioItem = async (req, res) => {
  const portfolioItem = req.body;
  const newBlog = await new PortfolioItems(portfolioItem);
  //fileUpload
  await newBlog.save();
  res.json("success");
};

module.exports.getPorfolioItems = async (req, res) => {
  const allPortfolioItems = await PortfolioItems.find({});
  res.json(allPortfolioItems);
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
