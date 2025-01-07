import React from 'react';
 
import Banner from '../Banner';
import TabCategories from '../TabCategories';
import RecentActivity from '../RecentActivity';
import OurTeam from '../OurTeam';

const Home = () => {
    return (
       <div className="">
        <Banner/>
        <TabCategories/>
        <RecentActivity/>
        <OurTeam/>
       </div>
    );
};

export default Home;