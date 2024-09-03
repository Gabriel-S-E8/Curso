const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const { imageUpload } = require('../helpers/image-upload')

module.exports = class UserController {
	static async register(req, res) {
		const { name, email, phone, password, confirmpassword } = req.body;

		//Validations
		if (!name) {
			res.status(422).json({ message: 'O nome é obrigatorio' });
		}
		if (!email) {
			res.status(422).json({ message: 'O email é obrigatorio' });
		}
		if (!password) {
			res.status(422).json({ message: 'A senha é obrigatorio' });
		}
		if (!phone) {
			res.status(422).json({ message: 'O telefone é obrigatorio' });
		}
		if (!confirmpassword) {
			res.status(422).json({ message: 'A confirmação de senha é obrigatorio' });
		}

		if (password !== confirmpassword) {
			res.status(422).json({ message: 'As senhas não coincidem' });
			return;
		}

		//check if user exists
		const userExists = await User.findOne({ email: email });

		if (userExists) {
			res.status(422).json({ message: 'Este email já está cadastrado' });
			return;
		}

		// create a password
		const salt = await bcrypt.genSalt(12);
		const passwordHash = await bcrypt.hash(password, salt);

		// create a user
		// const user = await User.create({
		//   name,
		//   email,
		//   phone,
		//   password: passwordHash,
		// }); tambem e possivel fazer do jeito acima ja criaria direto e não necessitaria do save

		const user = new User({
			name,
			email,
			phone,
			password: passwordHash,
		});

		try {
			const newUser = await user.save();
			await createUserToken(newUser, req, res);
		} catch (error) {
			res.status(500).json({ message: error });
		}
	}

	static async login(req, res) {
		const { email, password } = req.body;

		if (!email) {
			res.status(422).json({ message: 'O email é obrigatório' });
		}
		if (!password) {
			res.status(422).json({ message: 'A senha é obrigatória' });
		}

		//check if user exists
		const user = await User.findOne({ email: email });

		if (!user) {
			res.status(422).json({ message: 'E-mail não cadastrado' });
			return;
		}

		// check if password match with db password
		const match = await bcrypt.compare(password, user.password);

		if (!match) {
			res.status(422).json({
				message: 'Senha inválida',
			});
			return;
		}

		await createUserToken(user, req, res);
	}

	static async checkUser(req, res) {
		let currentUser;

		console.log(req.headers.authorization);

		if (req.headers.authorization) {
			const token = getToken(req);
			const decoded = jwt.verify(token, 'nossosecret');

			currentUser = await User.findById(decoded.id);

			currentUser.password = undefined;
		} else {
			currentUser = null;
		}

		res.status(200).send({
			currentUser,
		});
	}

	static async getUserById(req, res) {
		const id = req.params.id;

		const user = await User.findById(id).select('-password');

		if (!user) {
			res.status(422).json({
				message: 'Usuário não encontrado',
			});
			return;
		}

		res.status(200).json(user);
	}

	static async editUser(req, res) {
		const id = req.params.id;
		const { name, email, phone, password, confirmpassword} = req.body;

		

		
		 
		// check if user exists
		const token = getToken(req);
		const user = await getUserByToken(token);



		if (!user) {
			res.status(422).json({
				message: 'Usuário não encontrado',
			});
			return;
		}

		//validations
		if (!name) {
			res.status(422).json({ message: 'O nome é obrigatorio' });
		}

		user.name = name;

		if (!email) {
			res.status(422).json({ message: 'O email é obrigatorio' });
		}

		// check if email is valid
		const userExists = await User.findOne({ email: email });

		if (user.email !== email && userExists) {
			res.status(422).json({
				message: 'E-mail already in use',
			});
			return;
		}

		if (req.file) {
			user.image = req.file.filename;
		}

		user.email = email;

		if (!phone) {
			res.status(422).json({ message: 'O telefone é obrigatorio' });
		}

		user.phone = phone;

		if (password != confirmpassword) {
			res.status(422).json({ message: 'Senhas não conferem' });
		} else if (password == confirmpassword && password != null) {
			//create a new password
			const salt = await bcrypt.genSalt(12);

			const passwordHash = await bcrypt.hash(password, salt);

			user.password = passwordHash;
		}

		try {
			// returns user updated data
			await User.findOneAndUpdate(
				{ _id: user._id },
				{ $set: user },
				{ new: true }
			);

			res.status(200).json({
				message: 'User updated',
				user
			});
		} catch (err) {
			res.status(500).json({ message: err });
			return console.log(user);
		}
	}
};
