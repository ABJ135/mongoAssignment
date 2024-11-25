const mongoose = require('mongoose')
const {Schema} = require ('mongoose')

const userSchema = new Schema ({

    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required:false
    },
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    age:Number,
    role:{type:String,required:true},
    createdAt:{type:Date,default:Date.now()}
})

const user = mongoose.model('user',userSchema)

module.exports = user