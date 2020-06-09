const Article = require('../models/article');
const createError = require('http-errors');
const { body, validationResult } = require('express-validator');

// Form Validator & Sanitizer Middleware
exports.validateForm = [
  body('title').trim().not().isEmpty().withMessage('Title is required.')
  .isLength({ max: 200 }).withMessage('Title should not exceed 200 characters.')
  .matches(/^[\w'",.!?\- ]+$/).withMessage(`Title should only contain letters, numbers, spaces, and '",.!?- characters.`),
  body('content').trim().escape()
  .isLength({ min: 3 }).withMessage('Article content must be at least 3 characters.')
  .isLength({ max: 5000 }).withMessage('Article content should not exceed 5000 characters.'),
]

// GET /articles
exports.list = (req, res, next) => {
  Article.find({}, 'title published updatedAt')
    .sort({title: 'asc'}).limit(50)
    .exec((err, articles) => {
      if (err) { return next(err); }
      res.render('articles/list', { title: 'Articles', articles: articles });
    });
};

// GET /articles/:id
exports.details = (req, res, next) => { 
  Article.findById(req.params.id, (err, article) => {
    if (err || !article) { return next(createError(404)); }
    res.render('articles/details', { title: 'Article', article: article });
  });
};

// GET /articles/create
exports.createView = (req, res, next) => {
  res.render('articles/create', { title: 'Create Article' });
};
// POST /articles/create
exports.create = (req, res, next) => {
  // Check request's validation result. Wrap errors in an object with useful functions.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('articles/create', { article: req.body, errors: errors.array() });
  }
  Article.create(req.body, (err, article) => {
    if (err) { return next(err); }
    /// req.flash('success', 'Article has been created.');
    res.redirect(`/articles/${article.id}`);
  });
};

// GET /articles/:id/update
exports.updateView = (req, res, next) => {
  Article.findById(req.params.id, (err, article) => {
    if (err || !article) { return next(createError(404)); }
    res.render('articles/update', { title: 'Update Article', article: article });
  });
};
// POST /articles/:id/update
exports.update = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('articles/update', { article: req.body, errors: errors.array() });
  }
  const article = { title: req.body.title, content: req.body.content,
                             published: req.body.published, _id: req.params.id }; 
  Article.findByIdAndUpdate(req.params.id, article, {new: true}, (err, newArticle) => {
    if (err) { return next(err); }
    // req.flash('success', 'Article has been updated.');
    res.redirect(`/articles/${newArticle.id}`);
  });
};

// GET /articles/:id/delete
exports.deleteView = (req, res, next) => {
  Article.findById(req.params.id, (err, article) => {
    if (err || !article) { next(createError(404)); }
    res.render('articles/delete', { title: 'Delete Article', article: article });
  });
};
// POST articles/:id/delete
exports.delete = (req, res, next) => {
  Article.findByIdAndRemove(req.body.id, (err) => {
    if (err) { return next(err); }
    //req.flash('info', 'Article has been deleted.');
    res.redirect('/articles');
  })
};