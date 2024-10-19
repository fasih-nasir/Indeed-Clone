import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import necessary styles
import '../index.css';
// Import Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLaptopCode, 
  faHeadset, 
  faMoneyBillWave, 
  faCogs, 
  faUserTie, 
  faClipboardCheck, 
  faShoppingCart, 
  faShieldAlt, 
  faPenFancy, 
  faChartLine 
} from '@fortawesome/free-solid-svg-icons';
import { Autoplay } from 'swiper/modules';
// Images
import img1 from '../assets/banner1.png';

export default function Home() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  
  // State to hold the counting values
  const [recruiters, setRecruiters] = useState(0);
  const [dailyUsers, setDailyUsers] = useState(0);
  const [dailyJobs, setDailyJobs] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  
  // Function to increment values
  const incrementValue = (value, setValue) => {
    let start = 0;
    const end = value;
    const duration = 2000; // Duration for counting in milliseconds
    const incrementTime = duration / end; // Calculate time between increments

    const timer = setInterval(() => {
      start += 1;
      setValue(start);
      if (start === end) {
        clearInterval(timer);
      }
    }, incrementTime);
  };

  useEffect(() => {
    incrementValue(50_000, setRecruiters);
    incrementValue(200_000, setDailyUsers);
    incrementValue(800_000, setDailyJobs);
    incrementValue(800_000, setTotalJobs);
  }, []);

  const onAutoplayTimeLeft = (swiper, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <>
      <section className="text-center text-lg-start">
        <div className="container-fluid d-flex flex-lg-row flex-column align-items-center px-4 py-5">
          {/* Left Section with Text */}
          <div className="col-lg-6 col-12 d-flex flex-column justify-content-center align-items-lg-start align-items-center text-lg-start text-center mb-4 mb-lg-0">
            <h1 className="display-5 mb-3 fw-semibold">
              The <span className="span1">Easiest Way</span> <br className="d-none d-lg-inline" /> to Get Your New Job
            </h1>
            <p className="fw-medium span2 mb-4">
              Each month, more than 3 million job seekers turn to our website in their search for work, making over 140,000 applications every single day.
            </p>
            <div className="d-flex justify-content-center justify-content-lg-start">
              <button className="btn btn-primary btn-lg px-4 me-3">Get Started</button>
              <button className="btn btn-outline-secondary btn-lg px-4">Learn More</button>
            </div>
          </div>

          {/* Right Section with Image */}
          <div className="col-lg-6 col-12 text-center">
            <img className="img-fluid rounded col-10" alt="hero" src={img1} />
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <div className="container-fluid px-4 mt-5">
        <h2 className="text-center my-2">Available Job Categories</h2>
        <p className="text-center my-2 mb-4">Find the job that’s perfect for you. about 800+ new jobs everyday</p>
        <div className="progress-container">
          {/* <div className="progress-circle" ref={progressCircle}></div> */}
          {/* <div className="progress-content" ref={progressContent}>2.5s</div> */}
        </div>
        <Swiper
          modules={[Autoplay]} // Add Autoplay, Pagination, Navigation modules
          slidesPerView={3} // Show 3 slides on large screens
          spaceBetween={30}
          autoplay={{
            delay: 2500, // Auto play every 2.5 seconds
            disableOnInteraction: false, // Continue autoplay after interactions
            onAutoplayTimeLeft, // Callback for time left
          }}
          breakpoints={{
            1200: {
              slidesPerView: 3, // 3 slides on large screens
            },
            992: {
              slidesPerView: 2, // 2 slides on medium screens
            },
            576: {
              slidesPerView: 1, // 1 slide on small screens
            },
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="jobBox text-center">
              <FontAwesomeIcon icon={faLaptopCode} size="3x" />
              <h5>Web Development</h5>
              <p>1526 Jobs Available</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="jobBox text-center">
              <FontAwesomeIcon icon={faHeadset} size="3x" />
              <h5>Customer Help</h5>
              <p>185 Jobs Available</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="jobBox text-center">
              <FontAwesomeIcon icon={faMoneyBillWave} size="3x" />
              <h5>Finance</h5>
              <p>168 Jobs Available</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="jobBox text-center">
              <FontAwesomeIcon icon={faCogs} size="3x" />
              <h5>Software</h5>
              <p>1856 Jobs Available</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="jobBox text-center">
              <FontAwesomeIcon icon={faUserTie} size="3x" />
              <h5>Human Resource</h5>
              <p>165 Jobs Available</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="jobBox text-center">
              <FontAwesomeIcon icon={faClipboardCheck} size="3x" />
              <h5>Management</h5>
              <p>965 Jobs Available</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="jobBox text-center">
              <FontAwesomeIcon icon={faShoppingCart} size="3x" />
              <h5>Retail & Products</h5>
              <p>563 Jobs Available</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="jobBox text-center">
              <FontAwesomeIcon icon={faShieldAlt} size="3x" />
              <h5>Security Analyst</h5>
              <p>254 Jobs Available</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="jobBox text-center">
              <FontAwesomeIcon icon={faPenFancy} size="3x" />
              <h5>Content Writer</h5>
              <p>142 Jobs Available</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="jobBox text-center">
              <FontAwesomeIcon icon={faChartLine} size="3x" />
              <h5>Market Research</h5>
              <p>532 Jobs Available</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      {/* End of Slider Section */}

      {/* PROGRESS */}
      <section className="text-gray-600 body-font">
        <div className="container-fluid px-4 py-24 ">
          <div className="d-flex flex-lg-row flex-column text-center ">
            <div className="col-lg-3 col-12">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                {recruiters.toLocaleString()}<span className="text-gray-500"> K+</span>
              </h2>
              <p className="leading-relaxed">
                <FontAwesomeIcon icon={faUserTie} className="mr-1" />
                Total Recruiters
              </p>
            </div>
            <div className="col-lg-3 col-12">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                {dailyUsers.toLocaleString()}<span className="text-gray-500"> K+</span>
              </h2>
              <p className="leading-relaxed">
                <FontAwesomeIcon icon={faHeadset} className="mr-1" />
                Daily Users
              </p>
            </div>
            <div className="col-lg-3 col-12">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                {dailyJobs.toLocaleString()}<span className="text-gray-500"> K+</span>
              </h2>
              <p className="leading-relaxed">
                <FontAwesomeIcon icon={faClipboardCheck} className="mr-1" />
                Daily Jobs
              </p>
            </div>
            <div className="col-lg-3 col-12">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                {totalJobs.toLocaleString()}<span className="text-gray-500"> K+</span>
              </h2>
              <p className="leading-relaxed">
                <FontAwesomeIcon icon={faChartLine} className="mr-1" />
                Total Jobs
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
