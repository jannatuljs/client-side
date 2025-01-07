 import React from 'react';
import { Link } from 'react-router-dom';
 
 
 const ServiceCard = ({service}) => {
   const {
    title, 
    category,
     min_price ,
    image,
     buyer,
     
    description} = service || {}
  return (
    <div className="">
          <div className="card bg-base-100 shadow-xl">
  <figure>
    <img className='h-52'
      src={image}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title} </h2>
      
    <p> Description: </p>
    <p>  {description.substring(0,50) }...</p>
    <p> Category: {category}</p>
    <p>Price:  ${min_price}</p>
    <div className="card-actions justify-center">
      <Link to={`/service/${service._id}`} className="btn bg-slate-500 btn-outline">See Details</Link>
    </div>
  </div>
</div>
        </div>
    
  );
 };
 
 export default ServiceCard;