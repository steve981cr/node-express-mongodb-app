const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String },
  content: { type: String },
  published: { type: Boolean, default: false }
}, {timestamps: true});

module.exports = mongoose.model('Article', articleSchema);