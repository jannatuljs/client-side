import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide'

import bgimg1 from '../assets/images/img-1.png'
import bgimg2 from '../assets/images/img-2.webp'
import bgimg3 from '../assets/images/img-3.jpeg'
 
 
 

const Banner = () => {
    return(
 <div className="">
 
 <div className='container px-6 py-10 mx-auto'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            text='The gift of a clean home'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            text='Whether you are here for a cozy dinner, a quick bite, or a grand celebration'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            text='Your health is your greatest wealth.we are here to support you every step of the way'
            
          />
        </SwiperSlide>
      </Swiper>
    </div>
 </div>
    );
    


};

export default Banner;