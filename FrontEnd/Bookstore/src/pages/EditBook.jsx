import React, {useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const EditBook = () => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [price, setPrice] = useState('')
    const [ratings, setRatings] = useState('')
    const [loading, setLoading] = useState(false)
    const Navigate = useNavigate()
    const {id} = useParams()


  useEffect(()=>{
    setLoading(true)
    axios.get(`https://bookstore5.onrender.com/books/${id}`)
    .then((response)=>{
        setAuthor(response.data.author)
        setName(response.data.name)
        setPrice(response.data.price)
        setRatings(response.data.ratings)
        setLoading(false)
    }).catch((error)=>{
        setLoading(false)
        alert('An error happened. Please check the console')
        console.log(error)
    })
  },[])  
    const handleEditBook =()=>{
const data = {
    name,
    author,
    price,
    ratings
}
setLoading(true)
axios.put(`http://localhost:3000/books/${id}`,data)
.then (()=>{
    setLoading(false)
    Navigate('/')
}).catch((error)=>{
    setLoading(false)
    alert('An error happened. Please check console')
    console.log(error)
})
    }

  return (
    <div className='p-4'>
<BackButton/>
<h1 className='text-3xl my-4'>Edit Book</h1>
{loading? <Spinner/> :''}
<div className='flex  flex-col border-2 border-sky-400 rounded-xl w=[600px] p-4 mx-auto'>
    <div className='my-4'>
    <label className='text-xl mr-4 text-gray-500'>Name</label>
    <input
    type='text'
    value ={name}
    onChange={(e)=>setName(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full'
    />

    </div>

    <div className='my-4'>
    <label className='text-xl mr-4 text-gray-500'>Author</label>
    <input
    type='text'
    value ={author}
    onChange={(e)=>setAuthor(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full'
    />

    </div>

    <div className='my-4'>
    <label className='text-xl mr-4 text-gray-500'>Price</label>
    <input
    type='text'
    value ={price}
    onChange={(e)=>setPrice(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full'
    />

    </div>

    <div className='my-4'>
    <label className='text-xl mr-4 text-gray-500'>Ratings</label>
    <input
    type='text'
    value ={ratings}
    onChange={(e)=>setRatings(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full'
    />

    </div>
<button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>
</div>
    </div>
  )
}

export default EditBook
