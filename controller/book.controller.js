const Book = require('../models/book.models')

const postBook = async(req,res)=>{
const data = req.body
const object = await Book.create(data)
res.json({"mesage":"Object created succcessfully",object})
}

const getBook = async (req,res)=>{
    const object  = await Book.find({})
    res.json(object)
}

const search = async (req,res)=>{
    const author = req.query.author
    const object = await Book.findOne({author:author})
    res.json(object)
}

const getById = async (req,res)=>{
    const id = req.params.id
    const object = await Book.findById(id)
    res.json(object)
}

const deletee = async (req,res)=>{
    const id = req.params.id
    const object = await Book.deleteOne({id})
}

module.exports = {
    postBook,
    getBook,
    getById,
    search
}