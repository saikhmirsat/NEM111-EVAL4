
const express = require('express')
const { PostModel } = require('../model/post.model')

const PostRoute = express.Router()

PostRoute.get('/', async (req, res) => {
    const { device } = req.query
    const user_id_making_req = req.body.user

    let query;

    if (device === undefined) {
        query = { user: user_id_making_req }
    } else {
        query = { user: user_id_making_req, device }
    }

    try {
        const data = await PostModel.find(query)
        res.send(data)
    } catch (err) {
        res.send({ "Msg": "Can't find", "err": err })
        console.log(err)
    }
})

PostRoute.post('/create', async (req, res) => {
    try {
        const payload = req.body
        const post = new PostModel(payload)
        await post.save()
        res.send({ "msg": "Post Added Successfully" })
    } catch (err) {
        console.log(err)
    }
})

PostRoute.delete('/delete/:id', async (req, res) => {
    const postID = req.params.id
    try {
        await PostModel.findByIdAndDelete({ _id: postID })
        res.send({ "msg": `post with id:${postID} has been deleted` })
    } catch (err) {
        console.log(err)
    }
})



PostRoute.patch('/update/:id', async (req, res) => {
    const payload = req.body
    const postID = req.params.id
    const post = await PostModel.findOne({ _id: postID })
    const user_id_in_note = post.user
    const user_id_making_req = req.body.user
    try {
        if (user_id_making_req != user_id_in_note) {
            res.send({ "msg": "Your not authorised" })
        } else {
            await PostModel.findByIdAndUpdate({ _id: postID }, payload)
            res.send({ "msg": `note with id:${postID} has been updated` })
        }

    } catch (err) {
        console.log(err)
    }
})




module.exports = {
    PostRoute
}