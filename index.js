const express = require('express')
const app = express()
require('dotenv').config()
const Post = require('./models/post')

app.use(express.json())

const morgan = require('morgan')
morgan.token('body', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body\n'))


app.get('/api/messages', (req, res) => {
    Post.find({}).then(posts => {
        res.json(posts)
    }).catch(() => response.status(400).end())
})

app.post('/api/messages', (req, res) => {
    const body = req.body
    if (!body.title || !body.content) {
        return res.status(400).json({ error: 'Content and title are required' })
    }
    const post = Post({
        title: body.title,
        content: body.content,
        date: new Date()
    })
    post.save()
        .then(rPost => res.json(rPost))
        .catch(err => {
            if (err.name === 'ValidationError') {
                return res.status(400).json({
                    error: err.message
                })
            }
            console.log(err)
            res.status(500).json({ error: 'Internal error' })
        })
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Listening port: ${PORT}`)
})
