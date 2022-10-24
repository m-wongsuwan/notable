const express = require('express')
const usersRouter = express.Router()
const User = require('../models/User')

// get users
usersRouter.get('/', (req, res, next) => {
    User.find((err, users) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        const usersWithoutPassword = users.map(user => user.withoutPassword())
        return res.status(200).send(usersWithoutPassword)
    })
})

// get single user
usersRouter.get('/:userId', (req, res, next) => {
    User.findOne(
        { _id: req.params.userId },
        (err, user) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(!user) {
                res.status(403)
                return next(new Error('User does not exist!'))
            }
            return res.status(200).send(user.withoutPassword())
        }
    )
})

// update profile
usersRouter.put('/updateprofile/:userId', (req, res, next) => {
    if(req.params.userId === req.auth._id) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            req.body,
            { new: true },
            (err, updatedUser) => {
                if(err) {
                    res.status(500)
                    return next(err)
                }
                if(updatedUser) {
                    return res.status(201).send(updatedUser.withoutPassword())
                } else {
                    res.status(500)
                    return next(new Error('Bad request'))
                }
            }
        )
    } else {
        res.status(500)
        return next(new Error('Unauthorized request!'))
    }
    
})

// like a user
usersRouter.put('/like/:userId', (req, res, next) => {
    User.updateOne(
        { _id: req.auth._id },
        { $addToSet: { likedUsers: req.params.userId }},
        { new: true },
        (err, updatedLiker) => {
            if(err) {
                res.status(500)
                return next(err)
            }
        }
    )
    User.updateOne(
        { _id: req.params.userId },
        { $addToSet: {likedBy: req.auth._id} },
        { new: true },
        (err, updatedLikee) => {
            if(err){
                res.status(500)
                return next(err)
            }
            // probably needs .withoutPassword()
            return res.status(201).send(updatedLikee)
        }
    )
})

// Account Deletion
usersRouter.delete('/:userId', (req, res, next) => {
    User.findOneAndDelete(
        { _id: req.params.userId, user: req.auth._id },
        (err, deletedUser) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send('Successfully deleted user.')
        }
    )
})

module.exports = usersRouter