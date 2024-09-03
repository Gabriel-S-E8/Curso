const Pet = require('../models/Pet')


//Helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')



module.exports = class PetController {
    // create a pet
    static async create(req, res) {
        const { name, age, weight, color} = req.body

        const available = true

        // images uploado

        //validation

        if (!name) {
            res.status(422).json({ 
                message: 'name is required'
            })
            return
        }

        if (!age) {
            res.status(422).json({ 
                message: 'age is required'
            })
            return
        }

        if (!weight) {
            res.status(422).json({ 
                message: 'weight is required'
            })
            return
        }

        if (!color) {
            res.status(422).json({ 
                message: 'color is required'
            })
            return
        }

        // get pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)

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
            }
        })

        try {
            const newPet = await pet.save()
            res.status(201).json({
                message: 'Pet cadastrado com sucesso!',
                newPet,
            })
        } catch (error) {
            res.status(500).json({message: error})
            console.log(error)
        }
    }
}