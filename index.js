const express = require("express")
const { connection } = require("./config/db")
const { UserRoute } = require('./routes/user.route')
const { PostRoute } = require('./routes/post.route')
const { authenticate } = require('./middleware/authenticate.middleware')

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("This is my Linkedin home")
})

app.use('/users', UserRoute)
app.use(authenticate)
app.use('/posts', PostRoute)

app.listen(8080, async () => {
    try {
        await connection
        console.log("Connected to db")
    } catch (err) {
        console.log(err)
    }
})