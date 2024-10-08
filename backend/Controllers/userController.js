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
        return res.status(400).json({ error: error.message })
    }
    return res.json({mssg:'login user'})
}



const signupUser = async (req, res) => {
    
    const {email, password} = req.body
    
    try {
        const user = await User.signup(email, password)
        const token = createjwttoken(user._id)

        return res.status(200).json({email, token})
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }

}


module.exports = {loginUser, signupUser}