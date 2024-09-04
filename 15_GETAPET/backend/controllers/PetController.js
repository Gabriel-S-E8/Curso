const Pet = require('../models/Pet');

//Helpers
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class PetController {
	// create a pet
	static async create(req, res) {
		const { name, age, weight, color } = req.body;

		// get pet owner
		const token = getToken(req);
		const user = await getUserByToken(token);

		const available = true;

		// images uploado
		const images = req.files;

		//validation
		if (!name) {
			res.status(422).json({
				message: 'name is required',
			});
			return;
		}

		if (!age) {
			res.status(422).json({
				message: 'age is required',
			});
			return;
		}

		if (!weight) {
			res.status(422).json({
				message: 'weight is required',
			});
			return;
		}

		if (!color) {
			res.status(422).json({
				message: 'color is required',
			});
			return;
		}

		if (images.length === 0) {
			res.status(422).json({
				message: 'images are required',
			});
			return;
		}

		// create a new pet
		const pet = new Pet({
			name,
			age,
			weight,
			color,
			available,
			images: [],
			user: {
				_id: user._id,
				name: user.name,
				image: user.image,
				phone: user.phone,
			},
		});

		// upload images to the server
		images.map((image) => {
			pet.images.push(image.filename);
		});

		try {
			const newPet = await pet.save();
			res.status(201).json({
				message: 'Pet registered successfully!',
				newPet,
			});
		} catch (error) {
			res.status(500).json({ message: error });
			console.log(error);
		}
	}

	static async getAll(req, res) {
		const pets = await Pet.find().sort('-createdAt');

		res.status(200).json({
			pets: pets,
		});
	}

	static async getAllUserPets(req, res) {
		// get user from token
		const token = getToken(req);
		const user = await getUserByToken(token);

		const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt');

		res.status(200).json({
			pets,
		});
	}

	static async getAllUserAdoptions(req, res) {
		// get user from token
		const token = getToken(req);
		const user = await getUserByToken(token);

		const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt');

		res.status(200).json({
			pets,
		});
	}

	static async getPetById(req, res) {
		const id = req.params.id;

		// check if id is valid
		if (!ObjectId.isValid(id)) {
			res.status(422).json({
				message: 'Invalid id',
			});
			return;
		}

		// check if pet exists
		const pet = await Pet.findOne({ _id: id });

		if (!pet) {
			res.status(404).json({
				message: 'Pet not found',
			});
			return;
		}
		res.status(200).json({
			pet: pet,
		});
	}

	static async removePetById(req, res) {
		const id = req.params.id;

		// check if id is valid
		if (!ObjectId.isValid(id)) {
			res.status(422).json({
				message: 'Invalid id',
			});
			return;
		}

		// check if pet exists
		const pet = await Pet.findOne({ _id: id });

		if (!pet) {
			res.status(404).json({
				message: 'Pet not found',
			});
			return;
		}

		// check if logged user registered the pet
		const token = getToken(req);
		const user = await getUserByToken(token);

		if (pet.user._id.toString() !== user._id.toString()) {
			res.status(422).json({
				message: 'There was a problem Try again later!',
			});
			return;
		}

		await Pet.findByIdAndDelete(id);

		res.status(200).json({
			message: 'Pet removed',
		});
	}

	static async updatePet(req, res) {
		const id = req.params.id;

		const { name, age, weight, color, available } = req.body;

		// images uploado
		const images = req.files;

		const updatedData = {};

		// check if pet exists
		const pet = await Pet.findOne({ _id: id });

		if (!pet) {
			res.status(404).json({
				message: 'Pet not found',
			});
			return;
		}

		// check if logged user registered the pet
		const token = getToken(req);
		const user = await getUserByToken(token);

		if (pet.user._id.toString() !== user._id.toString()) {
			res.status(422).json({
				message: 'There was a problem Try again later!',
			});
			return;
		}

		//validation
		if (!name) {
			res.status(422).json({
				message: 'name is required',
			});
			return;
		} else {
			updatedData.name = name;
		}

		if (!age) {
			res.status(422).json({
				message: 'age is required',
			});
			return;
		} else {
			updatedData.age = age;
		}

		if (!weight) {
			res.status(422).json({
				message: 'weight is required',
			});
			return;
		} else {
			updatedData.weight = weight;
		}

		if (!color) {
			res.status(422).json({
				message: 'color is required',
			});
			return;
		} else {
			updatedData.color = color;
		}

		if (images.length === 0) {
			res.status(422).json({
				message: 'images are required',
			});
			return;
		} else {
			updatedData.images = [];
			images.map((image) => {
				updatedData.images.push(image.filename);
			});
		}

		await Pet.findByIdAndUpdate(id, updatedData);

		res.status(200).json({
			message: 'Pet updated successfully!',
		});
	}

	static async schedule(req, res) {
		const id = req.params.id;

		// check if pet exists
		const pet = await Pet.findOne({ _id: id });

		if (!pet) {
			res.status(404).json({
				message: 'Pet not found',
			});
			return;
		}

		//check if user registered the pet
		const token = getToken(req);
		const user = await getUserByToken(token);

		if (pet.user._id.equals(user._id)) {
			res.status(422).json({
				message: 'you cannot schedule a visit with your own pet',
			});
			return;
		}

		// add user to pet
		pet.adopter = {
			_id: user._id,
			name: user.name,
			image: user.image,
			phone: user.phone,
		};

		//check if user has already scheduled the visit
		if (pet.adopter) {
			if (pet.adopter._id.equals(user._id)) {
				res.status(422).json({
					message: 'You have already scheduled a visit with this pet!',
				});
				return;
			}
		}

		await Pet.findByIdAndUpdate(id, pet);

		res.status(200).json({
			message: `Visit scheduled successfully!, contact ${pet.user.name} by phone ${pet.user.phone}`,
		});
	}

	static async concludeAdoption(req, res) {
		const id = req.params.id;

		// check if pet exists
        const pet = await Pet.findOne({ _id: id });

		if (!pet) {
            res.status(404).json({
                message: 'Pet not found',
            });
            return;
        }

		// check if logged user registered the pet
		const token = getToken(req);
		const user = await getUserByToken(token);

		if (pet.user._id.toString() !== user._id.toString()) {
			res.status(422).json({
				message: 'There was a problem Try again later!',
			});
			return;
		}


		
		pet.available = false

		await Pet.findByIdAndUpdate(id, pet);
		
		res.status(200).json({
			message: 'Adoption concluded successfully!',
		})

	}
};
