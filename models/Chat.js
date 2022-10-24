const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    chatLog: [{
        messageText: String,
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        timeStamp: {
            type: Date,
            defatult: Date.now
        }
    }]
})

module.exports = mongoose.model("Message", messageSchema)