import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import ServiceCard from './ServiceCard'
import { useEffect, useState } from 'react';
import axios from 'axios';
 

const TabCategories = () => {
  const [services, setServices] = useState([]);
    useEffect(() => {
        fetchAllService()
    }, [])

    const fetchAllService = async () => {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/services`)
      setServices(data)
    }
  return (
    <Tabs>
      <div className=' container px-6 py-10 mx-auto'>
        <h1 className='text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl '>
          Browse Service By Categories
        </h1>

        <p className='max-w-2xl mx-auto my-6 text-center text-gray-500 '>
          Three categories available for the time being. They are Home Service, Health Service and Restaurant Service. Browse them by
          clicking on the tabs below.
        </p>
        <div className='flex items-center justify-center'>
          <TabList>
            <Tab>Home Service</Tab>
            <Tab>Health Service</Tab>
            <Tab>Restaurants Service</Tab>
          </TabList>
        </div>
        <TabPanel>
          <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {services.filter(service => service.category === 'Home Service')
          .map(service=><ServiceCard key={service._id} 
          service={service}/>)}
          </div>
        </TabPanel>

        <TabPanel>
          <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {services.filter(service => service.category === 'Health Service')
          .map(service=><ServiceCard key={service._id} 
          service={service}/>)}
          </div>
        </TabPanel>

        <TabPanel>
          <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {services.filter(service => service.category === 'Restaurants Service')
          .map(service=><ServiceCard key={service._id} 
          service={service}/>)}
          </div>
        </TabPanel>
      </div>
    </Tabs>
  )
}

export default TabCategories
