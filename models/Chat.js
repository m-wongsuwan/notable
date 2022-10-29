const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    chatLog: [{
        messageText: {
            type: String,
            required: true
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        timeStamp: {
            type: Date,
            defatult: Date.now
        }
    }]
})

module.exports = mongoose.model("Chat", chatSchema)