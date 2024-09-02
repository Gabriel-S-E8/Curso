const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductsController');

router.get('/create', ProductController.createProduct);
router.post('/create', ProductController.createProductPost);
router.get('/:id', ProductController.getProduct);
router.get('/', ProductController.showProducts);

module.exports = router;
