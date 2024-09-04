const multer = require('multer');
const path = require('path');

// destination of image files
const imageStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		let folder = '';

		if (req.baseUrl.includes('users')) {
			folder = 'users';
		} else if (req.baseUrl.includes('pets')) {
			folder = 'pets';
		}
		cb(null, `public/images/${folder}`);
	},
	filename: function (req, file, cb) {
		cb(
			null,
			Date.now() +
				String(Math.floor(Math.random() * 100)) +
				path.extname(file.originalname)
		);
	},
});

const imageUpload = multer({
	storage: imageStorage,
	fileFilter: function (req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
			return cb(new Error('Only image files are allowed!'), false);
		}
		cb(undefined, true);
	},
});

module.exports = { imageUpload };
