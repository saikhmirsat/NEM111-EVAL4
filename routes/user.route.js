const { hash } = require('bcrypt')
const express = require('express')
const { UserModel } = require("../model/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserRoute = express.Router()

UserRoute.get('/', async (req, res) => {
    const data = await UserModel.find()
    res.send(data)
})

UserRoute.post('/register', async (req, res) => {
    const { name, email, gender, password, age, city } = req.body
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            res.send({ "msg": "User already exist, please login" })
        } else {
            bcrypt.hash(password, 7, async (err, hash) => {
                if (err) {
                    res.send({ "msg": "something went erong", "err": err.message })
                } else {
                    const user = new UserModel({ name, email, gender, password: hash, age, city })
                    await user.save()
                    console.log(user)
                    res.send({ "msg": "New User Register Sucessfully" })
                }
            })
        }


    } catch (err) {
        res.send({ "err": err })
        console.log(err)
    }
})

UserRoute.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {

        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user[0]._id }, "masai")
                    res.send({ "msg": "login successfull", "token": token })
                } else {
                    res.send({ "msg": "something went wrong", "err": err })
                }
            });
        } else {
            res.send({ "msg": "wrong credentoal" })
        }

    } catch (err) {
        res.send({ "msg": "something went wrong", "err": err })
        console.log(err)
    }
})

module.exports = {
    UserRoute
}
