 import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import axios from 'axios';
 
 const AllServices = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetchAllService()
    }, [])

    const fetchAllService = async () => {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/services`)
      setServices(data)
    }
    console.log(services ); 
    return (
        <div>
             <div>
       <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
      <div>
        <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
           

       
           
        </div>
        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
           {services.map(service=><ServiceCard key={service._id} service={service}/>)}
           
        </div>
      </div>
    </div>
    </div>
        </div>
    );
 };
 
 export default AllServices;