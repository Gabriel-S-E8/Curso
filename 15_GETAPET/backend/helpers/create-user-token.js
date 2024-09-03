const jwt = require('jsonwebtoken');

const createUserToken = async (user, req, res) => {
    // Create a token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "nossosecret")

    // return the token
    res.status(200).json({
        message: "Você está authenticado",
        token: token,
        userId: user._id
    })
}


module.exports = createUserToken