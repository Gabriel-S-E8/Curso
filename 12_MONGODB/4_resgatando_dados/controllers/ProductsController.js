const Product = require('../models/Product');

module.exports = class ProductController {
	static async showProducts(req, res) {
		const products = await Product.getProducts();

		res.render('products/all', { products });
	}

	static createProduct(req, res) {
		res.render('products/create');
	}

	static async createProductPost(req, res) {
		const name = req.body.name;
		const image = req.body.image;
		const price = req.body.price;
		const description = req.body.description;

		const product = new Product(name, image, price, description);
		product.save();

		res.redirect('/products/create');
	}
};
