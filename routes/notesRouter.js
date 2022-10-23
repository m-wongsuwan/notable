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
                req.body.initiatingUser = req.auth._id
                req.body.receivingUser = req.params.userId
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

// get all notes for a user
notesRouter.get('/getnotes/:userId', (req, res, next) => {
    Note.find(
        { receivingUser: req.params.userId, receivingUser: req.auth._id },
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
        { initiatingUser: req.auth._id },
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