const express = require('express')
const notesRouter = express.Router()
const Note = require('../models/Note')
const User = require('../models/User')

notesRouter.post('/addnote/:userId', (req, res, next) => {
    User.findOne(
        { _id: req.params.userId },
        (err, user) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(user) {
                // updates note receiver array "likedBy" with liker id
                User.updateOne(
                    { _id: req.params.userId },
                    { $addToSet: { likedBy: req.auth._id } },
                    { new: true },
                    (err, updatedLikeReceiver) => {
                        if(err) {
                            res.status(500)
                            return next(err)
                        }
                    }
                )
                // updates note giver's array "likedUsers" with likee id
                User.updateOne(
                    { _id: req.auth._id },
                    { $addToSet: { likedUsers: req.params.userId}},
                    { new: true },
                    (err, updatedLiker) => {
                        if(err) {
                            res.status(500)
                            return next(err)
                        }
                    }
                )
                req.body.initiatingUserId = req.auth._id
                req.body.receivingUserId = req.params.userId
                const newNote = new Note(req.body)
                newNote.save((err, savedNote) => {
                    if(err) {
                        res.status(500)
                        return next(err)
                    }
                    return res.status(201).send(savedNote)
                })
            } else {
                res.status(403)
                return next(new Error('That user ID does not exist.'))
            }
        }
    )
})

// get received notes for current user
notesRouter.get('/getnotes/:userId', (req, res, next) => {
    Note.find(
        { receivingUserId: req.params.userId },
        (err, notes) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(notes)
        }
    )
})

// get notes sent from a user
notesRouter.get('/getsentnotes/:userId', (req, res, next) => {
    Note.find(
        { initiatingUserId: req.auth._id },
        (err, notes) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(notes)
        }
    )
})

module.exports = notesRouter