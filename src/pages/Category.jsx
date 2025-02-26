import React from 'react';
import { FaBriefcaseMedical } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';
import { IoMdAirplane } from 'react-icons/io';
import { IoAirplaneSharp } from 'react-icons/io5';
import { LuChartNoAxesCombined } from 'react-icons/lu';
import { MdPets } from 'react-icons/md';
import { RiRestaurantLine } from 'react-icons/ri';

const Category = () => {
    return (
        <div>
            <h3 className='text-3xl text-center mt-5 font-semibold'>What are you looking for?</h3>
        
         <div className="flex justify-center gap-6 mt-5">
         <div className="bg-orange-100 w-36 h-28 rounded-badge pt-2">
        <span> <RiRestaurantLine className='size-12 ml-9 mt-5 items-center'/></span>
       <p className='text-center text-lg font-bold'>Restaurants </p>
        </div>
        <div className="bg-orange-100 w-36 h-28 rounded-badge pt-2">
        <span> <FaBriefcaseMedical className='size-11 ml-9 mt-5 items-center'/></span>
       <p className='text-center text-lg font-bold'>Healths </p>
        </div>
        <div className="bg-orange-100 w-36 h-28 rounded-badge pt-2">
        <span> <LuChartNoAxesCombined className='size-12 ml-9 mt-5 items-center'/></span>
       <p className='text-center text-lg font-bold'>Services </p>
        </div>
         </div>


         <div className="flex justify-center gap-6 mt-5">
         <div className="bg-orange-100 w-36 h-28 rounded-badge pt-2">
        <span> <GiReceiveMoney className='size-12 ml-9 mt-5 items-center'/></span>
       <p className='text-center text-lg font-bold'>Insurances </p>
        </div>
        <div className="bg-orange-100 w-36 h-28 rounded-badge pt-2">
        <span> <MdPets className='size-12 ml-10 mt-5 items-center'/></span>
       <p className='text-center text-lg font-bold'>Animals </p>
        </div>
        <div className="bg-orange-100 w-36 h-28 rounded-badge pt-2">
        <span> <IoAirplaneSharp className='size-12 ml-9 mt-5 items-center'/></span>
       <p className='text-center text-lg font-bold'>Travels </p>
        </div>
         </div>
        
        </div>
    );
};

export default Category;