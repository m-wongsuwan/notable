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
        return res.status(200).send(users)
    })
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