const res = require("express/lib/response");
const mongoose = require("mongoose");
const Blog = require("../Models/Blogs");
const PortfolioItems = require("../Models/PortfolioItems");

module.exports.postBlog = async (req, res) => {
  const blog = JSON.parse(JSON.stringify(req.body));
  const newBlog = await new Blog(blog);
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  console.log(newBlog);
  newBlog.img = imgs[0];
  await newBlog.save();
  res.json("success");
};

module.exports.getBlogs = async (req, res) => {
  const allBlogs = await Blog.find({});
  res.json(allBlogs);
};

module.exports.getIndvidualBlog = async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId);
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
