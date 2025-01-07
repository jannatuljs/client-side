import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const MyServices = () => {
  const [services, setServices] = useState([]);
 const [search, setSearch] = useState('')
 console.log(search)
  useEffect(() => {
    // Replace with your API endpoint to fetch the user's services
    const fetchServices = async () => {
      try {
        const response = await axios.get( 
            `${import.meta.env.VITE_API_URL}/services`
        ); 
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);
 
 // Delete functionality
 const handleDelete = async (id) => {
  
     

  try {
    const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/service/${id}`);
    console.log(data);

    toast.success('Service deleted successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // Remove the deleted service from the state
    setServices(services.filter(service => service._id !== id));
  } catch (err) {
    console.log(err);
    alert('There was an error deleting the service.');
  }
};
const hotToast = (id) => {
toast(
  (t) => (
    <div className='flex gap-3 items-center'>
       <div className=""><p>Are you <b>sure?</b></p></div>
       <div className='gap-2 flex'> 
       <button 
       className='bg-red-400 text-white px-3 py-1 rounded-md'
       onClick={() =>  {
         toast.dismiss(t.id)
        handleDelete(id)
        }}>Yes</button>
        <button
        className='bg-green-400 text-white px-3 py-1 rounded-md'
         onClick={() => toast.dismiss(t.id)}>Cancel</button>
       </div>
       
    </div>
  )
 
);
}
  return (
    <section className='container px-4 mx-auto my-12 text-center'>
      
      <form>
            <div className='flex p-1 w-[330px] ml-64 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                type='text'
                name='search'
                onChange={(e)=>setSearch(e.target.value)}
                
                placeholder='Search by Category'
                aria-label='Search by Category'
                />

              <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
          </form>
      
      <div className='flex items-center gap-x-3'>
        <h2 className='text-lg font-medium text-gray-800 '>My Services</h2>
        <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full'>
          {services.length} Services
        </span>
      </div>

      <div className='flex flex-col mt-6'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border border-gray-200 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    {/* Define column headers */}
                    <th>Service Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Deadline</th>
                    <th>Category</th>
                    
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {services.filter((service) => {
                    return search.toLowerCase() === ''
                     ? service
                     :service.category.toLowerCase().includes(search);
                  })
                  .map((service) => (
                    <tr key={service._id}>
                      <td>{service.title}</td>
                      <td>{service.description.substring(0,10)}...</td>
                      <td>${service.min_price}</td>
                      <td>{service.category}</td>
                      <td>{format(new Date(service.date ), 'P')}</td>
                       
                      <td className='space-x-2'>
                          <button> <Link to= {`/edit service/${service._id}`}> <FaEdit /> </Link> </button>
                        <button onClick={() => hotToast(service._id)}><FaTrash /> </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default MyServices;
