const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const { randomBytes } = require('crypto')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentPostById = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentPostById[req.params.id] || [])
})
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body

    const comments = commentPostById[req.params.id] || []

    comments.push({ id: commentId, content })

    commentPostById[req.params.id] = comments

    axios.post('http://localhost:5005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    })
    res.status(201).send(comments)
})
app.post('/events', (req, res) => {
    console.log('Event Received:', req.body.type)

    res.send({})
})

app.listen(5001, () => {
    console.log('listening on port 5001')
})