import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'

const ShowBook = () => {
const [book, setBook] = useState({})
const [loading, setLoading] = useState(false)
const {id} = useParams()

useEffect(()=>{
    setLoading(true)
    axios.get(`https://bookstore-backend-azeu.onrender.com/books/${id}`)
    .then((response)=>{
        setBook(response.data);
        setLoading(false)
    }).catch((error)=>{
        console.log(error)
        setLoading(false)
    })
})
  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl my-4'>Show Book</h1>
        {
            !loading? (<Spinner/>):(
                <div className='flex flex-col border-2 border-sky-600 roundex-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl m-4 text-gray-500'>Id</span>
                        <span>{book._id}</span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl m-4 text-gray-500'>Name</span>
                        <span>{book.name}</span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl m-4 text-gray-500'>Author</span>
                        <span>{book.author}</span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl m-4 text-gray-500'>Price</span>
                        <span>{book.price}</span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl m-4 text-gray-500'>Ratings</span>
                        <span>{book.ratings}</span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl m-4 text-gray-500'>Create Time</span>
                        <span>{new Date(book.createdAt).toString()}</span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl m-4 text-gray-500'>Last Update Time</span>
                        <span>{new Date(book.updatedAt).toString()}</span>
                    </div>
                </div>
            )
        }
        </div>
  )
}

export default ShowBook
