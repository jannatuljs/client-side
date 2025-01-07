 
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
 
import { format } from 'date-fns';
import ReactRating from 'react-rating';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import useAxiosSecure from '../hooks/useAxiosSecure';
 

const MyReviews = () => {
  const axiosSecure = useAxiosSecure()
  const [reviews, setReviews] = useState([]);
  const {user} = useContext(AuthContext)
  
 

  useEffect(() => {
    fetchAllReviews()
   
  }, [user])
  const fetchAllReviews = async () => {
    const {data} = await  axiosSecure.get(
      `/reviews/${user?.email}`
    )
    setReviews(data)
    
  }
  // console.log(reviews)
  return (
    <div>
      <div className="mt-5  ml-7 grid grid-cols-2 mb-2 gap-4 ">
               
            
                 {
                  reviews.map((review) => {
                    const {_id,description,rating,buyer,title} = review || {};
                    return(
                      <div key={_id} className="card bg-red-100 w-96 shadow-xl  ">
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
            
    </div>
  );
};

export default MyReviews;