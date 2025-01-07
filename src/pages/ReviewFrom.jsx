import React, { useContext } from 'react';
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import AuthContext from '../context/AuthContext/AuthContext';
import axios from 'axios';
import Rating from 'react-rating';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewFrom = () => {
 

 const {user} = useContext(AuthContext);
const [startDate, setStartDate] = useState(new Date())
const [rating, setRating] = useState('');

const handleRatingChange = (event) => {
  setRating(event.target.value);
};

const handleSubmit = async e => {
 e.preventDefault();
 const form = e.target;
 const title = form.title.value;
 const email = form.email.value;
 const date = startDate;
 const ratingValue = form.rating.value;

 const description = form.description.value;

 const formData = {
   title,
   buyer:{
     email,
     name: user?.displayName,
     photo: user?.photoURL,
   },
   date,
   rating: ratingValue,
  
   description

 }
 try {
  // Make a POST request to submit the review
  const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, formData);
  console.log(data);

  // Show success notification
  toast.success('Review submitted successfully!');
} catch (error) {
  console.error('Error submitting review:', error);

  // Show error notification
  toast.error('Failed to submit review. Please try again.');
}

};
 return (
   <div>
      <div className='flex justify-center   items-center min-h-[calc(100vh-306px)] my-12'>
     <section className=' p-2 md:p-6 mx-auto border-2 bg-white rounded-md shadow-md '>
       <h2 className='text-lg font-semibold text-gray-700 capitalize '>
          Write a review :
       </h2>

       <form onSubmit={handleSubmit}> 
         <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
           <div>
             <label className='text-gray-700 ' htmlFor='service_title'>
               Service Title
             </label>
             <input
               id='title'
               name='title'
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

             {/* Rating Input */}
             <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Rating:</span>
                </label>
                <select
                  name="rating"
                  id="rating"
                  className="border p-2 w-full rounded-md"
                  value={rating} 
                  onChange={handleRatingChange}  
                  required
                >
                  
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
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
           ></textarea>
         </div>
         <div className='flex justify-center mt-6'>
           <button className='disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
           Submit review
           </button>
         </div>
       </form>
     </section>
   </div>
   <ToastContainer />
   </div>
 );
};

export default ReviewFrom;