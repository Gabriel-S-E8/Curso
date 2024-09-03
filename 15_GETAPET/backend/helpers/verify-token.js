const jwt = require('jsonwebtoken');
const getToken = require('./get-token');

const checkToken = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).json({ error: 'Access Denied' });
	}

	const token = getToken(req);

	if (!token) {
		return res.status(401).json({ error: 'Access Denied' });
	}

	try {
		const verified = jwt.verify(token, 'nossosecret');
		req.user = verified;
		next();
	} catch (err) {
		return res.status(400).json({ message: 'invalid token' });
	}
};

module.exports = checkToken;
