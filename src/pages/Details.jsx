 
   import axios from 'axios';
   import React, {useEffect, useState } from 'react';
   import { Link, useParams } from 'react-router-dom';
 import {format} from 'date-fns'
 
  
  
  
  const Details = () => {
     const {id} = useParams();
     const [service, setService] = useState({})
     const [reviews, setReviews] = useState([]);
     
   
 
     useEffect(() => {
         fetchServiceData()
     }, [id])
 
     const fetchServiceData = async () => {
         const {data} = await axios.get(
             `${import.meta.env.VITE_API_URL}/service/${id}`
         )
         setService(data)
         setReviews(data.reviews)
     }
     const {
         title, 
         category,
          min_price ,
         image,
          date,
           
         description} = service || {}
     return (
         <div className='ml-4 mr-4 mt-3'>
             <div className="card border-2 card-side bg-base-100 w-full shadow-xl">
   <figure>
     <img className='p-4 rounded-lg'
       src={image}
       alt="images" />
   </figure>
   <div className="card-body">
     <h2 className="card-title">{title}</h2>
     <p>Category: {category}</p>
     <p>Price: ${min_price}</p>
      
     
      <p>Description: <br/>{description}</p>
       
      <p>Date: {format(new Date( ), 'P')}</p>
     
     <div className="card-actions justify-end">
 
       <Link to='/add review' className="btn btn-outline">Add Review</Link>
     </div>
   </div>
   
 </div>
  
 
         </div>
     );
  };
  
  export default Details ;