const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    handle: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: ""
    },
    memberSince: {
        type: Date,
        default: Date.now
    },
    profileImgUrl: {
        type: String
    },
    birthYear: {
        type: Number,
        required: true
    },
    birthMonth: {
        type: Number,
        required: true
    },
    aboutMe: {
        type: String
    },
    agePrefFloor: {
        type: Number,
        required: true
    },
    agePrefCeiling: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['MAN', 'WOMAN', 'NON-BINARY', 'OTHER']
    },
    genderPref: [
        {
            type: String, 
            enum: ['MAN', 'WOMAN', 'NON-BINARY', 'OTHER']
        }
    ],
    likedUsers: {
        type: Array
    },
    likedBy: {
        type: Array
    }
})

userSchema.pre("save", function(next){
    const user = this
    if(!user.isModified("password")) return next()
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next(err)
        user.password = hash
        next()
    })
})

userSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) return callback(err)
        return callback(null, isMatch)
    })
}

userSchema.methods.withoutPassword = function() {
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model("User", userSchema)