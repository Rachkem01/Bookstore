import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
   
    author:{type:String, required:true, trim:true},
    name:{type:String, required:true, trim:true},
    price:{type:String, required: true, trim:true},
    ratings:{type:Number, required:true, min:1, max:5},
})

 export const bookModel = mongoose.model('Book',bookSchema)