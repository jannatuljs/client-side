 import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
import { FaRegStar} from 'react-icons/fa';
import ReactRating from 'react-rating';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import {format} from 'date-fns'

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [hover, setHover] = useState(null);
    const {user} = useContext(AuthContext);
    console.log(user)

    
    useEffect(() => {
        fetchAllService()
    }, [])

    const fetchAllService = async () => {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/reviews?limit=6`)
        setReviews(data)
    }
    console.log(reviews)
 
    return (
      <div className="mt-5 ml-3   grid grid-cols-3 mb-2 gap-2 ">
         
      
           {
            reviews.map((review) => {
              const {_id,description,rating,buyer,title} = review || {};
              return(
                <div key={_id} className="card bg-red-100   shadow-xl  ">
                <div className="card-body">
                
                <img className='w-16 h-16 rounded-full' src={buyer?.photo} alt=''/>
                <p> {buyer?.name}</p>
                <p>Title: {title}</p>
              <p>Date: {format(new Date( ), 'P')}</p>
              <div className="form-control mb-3">
              <label className="label">
                      <span className="label-text">Rating:</span>
                    </label>
                    <ReactRating
                      emptySymbol={<FaRegStar />}
                      fullSymbol={<FaStar />}
                      halfSymbol={<FaStarHalfAlt />}
                      initialRating={rating} // Use the review's rating
                      fractions={2}
                      readonly // Make rating read-only, assuming it should just be displayed here
                    />
                  
              </div>
              
               
                  <p>
                      Description: {description}
                  </p>
                   
                </div>
              </div>
              );
            })
           }
      

 
      </div>
          
    );
 };
 
 export default ReviewList;