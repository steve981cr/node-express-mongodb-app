const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');
const articlesController = require('../controllers/articlesController');

// Pages routes
router.get('/', pagesController.home);
router.get('/about', pagesController.about);

// Articles routes
router.get('/articles', articlesController.list);
router.get('/articles/create', articlesController.createView);
router.post('/articles/create', articlesController.validateForm, articlesController.create);
router.get('/articles/:id', articlesController.details);
router.get('/articles/:id/update', articlesController.updateView);
router.post('/articles/:id/update', articlesController.validateForm, articlesController.update);
router.get('/articles/:id/delete', articlesController.deleteView);
router.post('/articles/:id/delete', articlesController.delete);

module.exports = router;