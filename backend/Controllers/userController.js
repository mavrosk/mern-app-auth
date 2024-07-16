const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createjwttoken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'})
}



const loginUser = async (req, res) => {

    const {email, password} = req.body;

    try {
        const user = await User.login(email, password)
        const token = createjwttoken(user._id)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    res.json({mssg:'login user'})
}



const signupUser = async (req, res) => {
    
    const {email, password} = req.body
    
    try {
        const user = User.signup(email, password)

        const token = createjwttoken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    res.json({mssg:"signup user"})
}


module.exports = {loginUser, signupUser}