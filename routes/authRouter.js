const express = require('express')
const authRouter = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || "secret phrase for local dev"

authRouter.post('/signup', (req, res, next) => {
    User.findOne(
        { handle: req.body.handle.toLowerCase() },
        (err, user) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(user) {
                res.status(403)
                return next(new Error('That username is already taken'))
            }
            const newUser = new User(req.body)
            newUser.save((err, savedUser) => {
                if(err) {
                    res.status(500)
                    return next(err)
                }
                const token = jwt.sign(savedUser.withoutPassword(), secret)
                return res.status(201).send({ token, user: savedUser.withoutPassword()})
            })
        }
    )
})

authRouter.post('/login', (req, res, next) => {
    User.findOne(
        { handle: req.body.handle.toLowerCase() },
        (err, user) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(!user) {
                res.status(403)
                return next(new Error('Username or Password are incorrect'))
            }

            user.checkPassword(req.body.password, (err, isMatch)=> {
                if(err) {
                    res.status(403)
                    return next(new Error('Username or Password are incorrect'))
                }
                if(!isMatch){
                    res.status(403)
                    return next(new Error('Username or Password are incorrect'))
                }
                const token = jwt.sign(user.withoutPassword(), secret)
                return res.status(200).send({ token, user: user.withoutPassword() })
            })
        }
    )
})

module.exports = authRouter