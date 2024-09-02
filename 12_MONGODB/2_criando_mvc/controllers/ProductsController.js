const Product = require('../models/Product');

module.exports = class ProductController{
    static async showProducts(req, res) {
        res.render('products/all')
    }
}

