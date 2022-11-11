const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { expressjwt: jwt } = require('express-jwt')
const path = require("path")
const secret = process.env.SECRET || "secret phrase for local dev"


const port = process.env.PORT || 6666

app.use(express.json())
app.use(morgan('dev'))

// mongoose.connect(
//     'mongodb://localhost:27017/notable', 
//     () => console.log('Connected to the database')
// )
mongoose.connect('mongodb+srv://morgan:093hnslbj@cluster0.ztao3ap.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true})

app.use('/auth', require('./routes/authRouter'))
app.use('/api', jwt({ secret: secret, algorithms: ['HS256']}))
app.use('/api/users', require('./routes/usersRouter'))
app.use('/api/notes', require('./routes/notesRouter'))
app.use('/api/chat', require('./routes/chatRouter'))
app.use(express.static(path.join(__dirname, "client", "build")))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(port, ()=> {
    console.log(`Server is up on port ${port}`)
})