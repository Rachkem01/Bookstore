
import express from 'express'
import { bookModel } from '../models/bookModel.js';

const router = express.Router();
//Route to save a new book
router.post('/', async(request, response)=>{
    try {
if(
    !request.body.name || 
    !request.body.author||
    !request.body.price ||
    !request.body.ratings
){
    return response.status(400).send({
        message:'Send all required fields: name, author, price, ratings'
    });
}
const newBook = {
    name: request.body.name,
    author:request.body.author,
    price: request.body.price,
    ratings: request.body.ratings
}
const book = await bookModel.create(newBook)

return response.status(201).send(book)

    }catch (error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})


//Route to get all books from database
router.get('/', async (request, response)=>{
    try{
const books = await bookModel.find({})
return response.status(200).json({
    count:books.length,
    data:books
})
    }catch (error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})

//Route to get book by Id
router.get('/:id', async (request, response)=>{
    try{
     const { id} = request.params   
const book = await bookModel.findById(id)
return response.status(200).json(book)
    }catch (error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})


//update a book
router.put('/:id', async (request, response)=>{
    try{
if(
    !request.body.name || !request.body.author || !request.body.price || !request.body.ratings
){
    return response.status(400).send({
        message:'Send all required fields: name, author, price, ratings'
    })
}
const {id} = request.params
const result = await bookModel.findByIdAndUpdate(id, request.body)

if(!result){
    return response.status(404).json({message:'Book not found'})
}
return response.status(200).send({message:'Book updated succesfully'})
    }catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
});

//delete a book
router.delete('/:id', async (request, response)=>{
    try{
     const { id} = request.params   
const result = await bookModel.findById(id)

if(!result){
    return response.status(400).json({message:'Book not found'})
}

return response.status(200).json({message: 'Book Deleted sucessfully'})
    }catch (error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})

export default router;