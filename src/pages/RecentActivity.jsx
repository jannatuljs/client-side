import React from 'react';
import ReviewList from './ReviewList';

const RecentActivity = () => {
    return (
        <div>
           
           <h3 className='text-center text-4xl text-red-800 font-bold'>Recent Activity</h3>
        
          <div className="">
           <ReviewList/>
          </div>
        </div>
    );
};

export default RecentActivity;