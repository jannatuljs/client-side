import React from 'react';
 
import Banner from '../Banner';
import TabCategories from '../TabCategories';
import RecentActivity from '../RecentActivity';
import OurTeam from '../OurTeam';
import Category from '../Category';

const Home = () => {
    return (
       <div className="">
        <Banner/>
        <TabCategories/>
        <RecentActivity/>
        <Category/>
        <OurTeam/>
       </div>
    );
};

export default Home;