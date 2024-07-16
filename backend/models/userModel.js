const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator')


const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required:true,
        unique:true
    },
    password : {
        type: Number,
        required: true
    }
})


userSchema.statics.signup = async(email, password) => {

    if (!email || !password) {
        throw Error('Please fill all the fields')
    }

    if (!validator.isEmail(email)) {
        throw Error('Please fill all the fields')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Please rewrite a more secure password')
    }

    const exists = await this.findOne({email})

    if (exists) throw Error('This email is already in use!');

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email , password:hash})
    return user;
}


userSchema.statics.login = async(email, password) => {

    if (!email || !password) {
        throw Error('Please fill all the fields')
    }

    const user = await this.findOne({email})

    const match = await bcrypt.compare(password, user.password)

    if (!match){
        throw Error('Incorrect password')
    }

    return user;

}

module.exports = mongoose.model('User', userSchema)