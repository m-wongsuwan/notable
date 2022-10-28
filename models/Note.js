const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    noteText: {
        type: String,
        required: true
    },
    initiatingUserId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receivingUserId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Note", noteSchema)