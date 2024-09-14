import express from 'express'
import mongoose from 'mongoose';
import { bookModel } from './models/bookModel.js';
import bookroutes from './routes/bookroutes.js'
import cors from 'cors'
const app = express();


//middleware for parsing request body
app.use(express.json())

    const port = process.env.PORT || 4000

//middleware for handling cors policy
//option 1: Allow All origin with default cors (*)
//app.use(cors())
//option 2: Allow custom origin
 app.use(cors({
     origin :'*',
    methods:['GET','POST', 'PUT', 'DELETE'],
    allowedHeaders:['Content-Type']
}))
//create http request
app.get('/', (req, res)=>{
    console.log(req)
    res.status(204)
    res.send("Welcome to My Bookstore")
})

app.use('/books', bookroutes)

//connect databses
mongoose.connect('mongodb://127.0.0.1:27017')
.then(()=>{
console.log('App is connected to Database')
})
.catch((error)=>{
    console.log(error)
})
app.listen(port, ()=>{
    console.log('Server is running')
})
