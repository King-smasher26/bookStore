import React from 'react'
import { useNavigate,useParams} from 'react-router-dom';
import { useState } from 'react';
import BackButton from '../components/BackButton';
import MySpinner from '../components/MySpinner';
import axios from 'axios';
const DeleteBook = () => {
  const [loading,setLoading] = useState(false);
  const navigate=useNavigate();
  const {id}=useParams();
  const handleDelete= ()=>{
    setLoading(true);
    axios.delete(`http://localhost:5000/books/${id}`).then(()=>{
      setLoading(false);
      navigate('/');
    }).catch((e)=>{
      alert('An error occured check console ')
      console.log(e)
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3x1 my-4'>Delete book</h1>
      {
        loading?(<MySpinner/>):('')
      }
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2x1'>Are you sure u want to delete this book?</h3>

        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDelete}>Yes,delete it</button>
      </div>
    </div>
  )
  // return <h1>yo</h1>
}

export default DeleteBook