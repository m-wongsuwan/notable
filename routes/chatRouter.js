const express = require('express')
const chatRouter = express.Router()
const Chat = require('../models/Chat')

//initiate chat
chatRouter.post('/startchat/:userId', (req, res, next) => {
    Chat.findOne(
        { users: req.params.userId, users: req.auth._id },
        (err, existingChat) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return next( new Error('Chat already exists'))
        }
    )
    req.body.users = []
    req.body.users.push(req.params.userId)
    req.body.users.push(req.auth._id)
    const newChat = new Chat(req.body)
    newChat.save((err, savedChat) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedChat)
    })
})

// send message
chatRouter.put('/sendmessage/:userId', (req, res, next) => {
    let message = req.body
    message.sender = req.auth._id
    Chat.updateOne(
        { users: req.params.userId, users: req.auth._id },
        { $addToSet: {chatLog: message }},
        { new: true },
        (err, updatedChat) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(updatedChat) {
                return res.status(201).send(updatedChat)
            } else {
                res.status(500)
                return next(new Error('Bad request'))
            }
        }

    )
})


module.exports = chatRouter