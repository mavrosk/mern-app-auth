const User = require('../models/userModel')

const loginUser = async (req, res) => {
    res.json({mssg:'login user'})
}



const signupUser = async (req, res) => {
    
    const {email, password} = req.body
    
    try {
        const user = User.signup(email, password)
        res.status(200).json({email, user})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    res.json({mssg:"signup user"})
}


module.exports = {loginUser, signupUser}