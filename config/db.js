const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb+srv://todo:todo@cluster0.cj4mpat.mongodb.net/linkedin?retryWrites=true&w=majority')

module.exports={
    connection
}