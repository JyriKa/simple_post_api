const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('Connected to Mongo')
    })
    .catch((err) => {
        console.log(`Error connecting to Mongo: ${err}`)
    })

const postSchema = new mongoose.Schema({
    title: { type: String, minLength: 3, maxLength: 20, required: true },
    content: { type: String, minLength: 3, maxLength: 200, required: true },
    date: Date
})

postSchema.set('toJson', {
    transform: (doc, obj) => {
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v
    }
})

module.exports = mongoose.model('Post', postSchema)
