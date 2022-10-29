const express = require('express')
const chatRouter = express.Router()
const Chat = require('../models/Chat')

// get chats involving user
chatRouter.get('/getchats', (req, res, next) => {
    Chat.find(
        { users: req.auth._id },
        (err, chats) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(chats)
        }
    )
})

// get individual chat
chatRouter.get('/getconversation/:chatId', (req, res, next) => {
    Chat.findOne(
        { _id: req.params.chatId },
        (err, chat) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(chat)
        }
    )
}) 

//initiate chat
chatRouter.post('/startchat/:userId', (req, res, next) => {
    Chat.findOne(
        // { users: [req.params.userId, req.auth._id] },
        { users: {$all:[req.params.userId, req.auth._id]}},
        (err, existingChat) => {
            if(err) {
                res.status(500)
                return next(err)
            } else if(existingChat) {
                return next( new Error('Chat already exists'))
            } else {
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
            }
        }
    )
    
})

// send message
chatRouter.put('/sendmessage/:userId', (req, res, next) => {
    let message = req.body
    message.sender = req.auth._id
    Chat.updateOne(
        { users: {$all:[req.params.userId, req.auth._id]}},
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