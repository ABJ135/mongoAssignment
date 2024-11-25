const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const BookSchema = new Schema ({
    title:{type:String,required:true},
    author:{type:String,required:true},
    year:Number,
    genre: String,
    Summary:String
})

const Book = mongoose.model('Book',BookSchema)

module.exports = Book