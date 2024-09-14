import React, {useState}from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
const DeleteBook = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {id}= useParams()
    const handleDeleteBook = ()=>{
        setLoading(true)
        axios.delete(`https://bookstore5.onrender.com/books/${id}`)
        .then(()=>
        {  
            setLoading(false)
            navigate('/')
        }).catch((error)=>{
            alert(
            'An Error occured. Please Check console'
            )
            setLoading(false)
        })
    }
  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl my-4'>Delete Book</h1>
        {loading?<Spinner/>:''}
        <div className='flex flex-col items-center border-2 border-sky-400 roundex-xl w=[600px] p-8 mx-auto'>
            <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
            <button className='p=4 bg-red-600 text-white m-8 ' onClick={handleDeleteBook}>Yes, Delete it         `1`    `       `   q1</button>
        </div>
    </div>
  )
}

export default DeleteBook
