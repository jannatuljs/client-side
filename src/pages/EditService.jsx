 import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

 const EditService = () => {
    const {user} = useContext(AuthContext);
    const {id} = useParams()
    const navigate = useNavigate()
 const [startDate, setStartDate] = useState(new Date())

 const [service, setService] = useState({});
 useEffect(() => {
     fetchUpdateData()
 }, [id])

 const fetchUpdateData = async () => {
     const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/service/${id}`)
   setService(data)
   setStartDate(new Date(data.date))
 }

 const handleSubmit = async e => {
  e.preventDefault();
  const form = e.target;
  const title = form.service_title.value;
  const email = form.email.value;
  const date = startDate;
  const category = form.category.value;
  const  min_price =   parseFloat(form.min_price.value);
   
   
   
  const description = form.description.value;

  const formData = {
    title,
    buyer:{
      email,
      name: user?.displayName,
      photo: user?.photoURL,
    },
    date,
    category,
     min_price ,
     
     
 
    description

  }
  // make a post request
  const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/service/${id}`,
    formData)
    console.log(data)
 toast.success('Data Updated successfully!')
 navigate('/my services')
}
    return (
        
            <div>
                   <div className='flex justify-center   items-center min-h-[calc(100vh-306px)] my-12'>
                  <section className=' p-2 md:p-6 mx-auto border-2 bg-white rounded-md shadow-md '>
                    <h2 className='text-lg font-semibold text-gray-700 capitalize '>
                    Edit a Service
                    </h2>
            
                    <form onSubmit={handleSubmit}> 
                      <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
                        <div>
                          <label className='text-gray-700 ' htmlFor='service_title'>
                            Service Title
                          </label>
                          <input
                            id='service_title'
                            name='service_title'
                            defaultValue={service.title}
                            type='text'
                            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                          />
                        </div>
                         
                        <div>
                          <label className='text-gray-700 ' htmlFor='emailAddress'>
                            Email Address
                          </label>
                          <input
                            id='emailAddress'
                            type='email'
                            name='email'
                            defaultValue={user?.email}
                            disabled = {true}
                            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                          />
                        </div>
                        <div className='flex flex-col gap-2 '>
                          <label className='text-gray-700'>Added date</label>
            
                          {/* Date Picker Input Field */}
                          <DatePicker
                            className='border p-2 rounded-md'
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                          />
                        </div>
                        <div className='flex flex-col gap-2 '>
                          <label className='text-gray-700 ' htmlFor='category'>
                            Category
                          </label>
                          <select
                            name='category'
                            id='category'
                            defaultValue={service.category}
                            className='border p-2 rounded-md'
                          >
                            <option value='Home Service'>Home Service</option>
                            <option value='Health Service'>Health Service</option>
                            <option value='Restaurants Service'>Restaurants Service</option>
                          </select>
                        </div>
                        <div>
                          <label className='text-gray-700 ' htmlFor='min_price'>
                               Price
                          </label>
                          <input
                            id='min_price'
                            name='min_price'
                            defaultValue={service.min_price}
                            type='number'
                            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                          />
                        </div>
            
                         
            
                      </div>
                      <div className='flex flex-col gap-2 mt-4'>
                        <label className='text-gray-700 ' htmlFor='description'>
                          Description
                        </label>
                        <textarea
                          className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                          name='description'
                          id='description'
                          defaultValue={service.description}
                        ></textarea>
                      </div>
                      <div className='flex justify-center mt-6'>
                        <button className='disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                        Edit Service
                        </button>
                      </div>
                    </form>
                  </section>
                </div>
                <ToastContainer/>
        </div>
    );
 };
 
 export default EditService;