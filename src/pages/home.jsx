import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import necessary styles
import '../index.css';
import "../App.css"
// Import Font Awesome icons
// 
import Jobs from '../components/jobs';
// 
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
  faChartLine,
  faUsers,
  faUserFriends,
  faBriefcase,
  faSuitcase
} from '@fortawesome/free-solid-svg-icons';
import { Autoplay } from 'swiper/modules';
// Images
import img1 from '../assets/banner1.png';
import img2 from '../assets/banner2.png';


export default function Home() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  
  // State to hold the counting values
  const [recruiters, setRecruiters] = useState(0);
  const [dailyUsers, setDailyUsers] = useState(0);
  const [dailyJobs, setDailyJobs] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  
  // Function to increment values
  const incrementValue = (setValue) => {
    let start = 0; // Starting point for counting
    const end = 1000; // Target value to reach (1k)
    const duration = 2000; // Duration for counting in milliseconds
    const incrementTime = duration / end; // Calculate time between increments

    const timer = setInterval(() => {
      // Increment the start value by 1
      if (start < end) {
        start += 1; // Increment
        setValue(start); // Update the state with the current count
      } else {
        clearInterval(timer); // Clear the interval when reaching the end
      }
    }, incrementTime);
  };

  useEffect(() => {
    incrementValue(setRecruiters);
    incrementValue(setDailyUsers);
    incrementValue(setDailyJobs);
    incrementValue(setTotalJobs);
  }, []);

  const onAutoplayTimeLeft = (swiper, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
// Jobs

// Jobs
  return (
    <>
    <div className='fix'>
      <a href="#"><i className="fa-solid fa-arrow-up"></i></a>
      {/* <Link to={"#"}>Top</Link> */}
    </div>
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
              <Link to={"/hireme"}>
              <button className="btn btn-primary btn-lg px-4 me-3">Get Started</button>
              </Link>
              {/* <bu className="btn btn-outline-secondary btn-lg px-4">Learn More</bu/tton> */}
            </div>
          </div>

          {/* Right Section with Image */}
          <div className="col-lg-6 col-12 text-center">
            <img className="img-fluid rounded col-10" alt="hero" src={img1} />
          </div>
        </div>
      </section>
{/* HIRE ME  */}
<section className="text-gray-600 body-font">
      <div className="container-fluid px-0 py-24 mx-auto">
        <div className="d-flex flex-row justify-content-center hirediv">
          {/* Post a Job Section */}
          <Link to="/postjob" style={{ listStyle: 'none', textDecoration: 'none' }} className="d-flex justify-content-center col-6 align-items-center flex-column m-0 p-0">
          <div className="d-flex justify-content-center align-items-center mb-10 col-12 flex-column div3 px-4">
            {/* <Link to="/postjob" className="d-flex justify-content-center align-items-center flex-column m-0 p-0"> */}
              <div className="rounded-lg h-64 flex items-center justify-center bg-indigo-100">
                <i className="fas fa-briefcase py-4" style={{fontSize:"54px"}}></i>
              </div>
              <h2 className=" text-2xl font-medium text-gray-900 mt-6 mb-3">Post a Job</h2>
              <p className="leading-relaxed text-base text-center">Share your job openings with the world.</p>
            {/* </Link> */}
          </div>
          </Link>
          {/* Hire Me Section */}
          <Link to="/hireme" style={{ listStyle: 'none', textDecoration: 'none' }} className="d-flex justify-content-center col-6 align-items-center flex-column m-0 p-0">

          <div className=" d-flex justify-content-center align-items-center mb-10 col-12 flex-column div3 div4 px-4">
            {/* <Link to="/hireme" className="d-flex justify-content-center align-items-center flex-column m-0 p-0"> */}
              <div className="rounded-lg h-64 flex items-center justify-center bg-indigo-100">
                <i className="fas fa-user-check " style={{fontSize:"54px"}}></i>
              </div>
              <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Hire Me</h2>
              <p className="leading-relaxed text-base">Looking for a job? Let's connect!</p>
            {/* </Link> */}
          </div>
</Link>
        </div>
      </div>
    </section>
{/* HIRE ME */}
      {/* Slider Section */}
      <div className="container-fluid px-4 my-5">
        <h2 className="text-center my-2">Available Job Categories</h2>
        <p className="text-center my-2 mb-4">Find the job that’s perfect for you. about 800+ new jobs everyday</p>
        <div className="progress-container my-4">
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
              <p>785 Jobs Available</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="jobBox text-center">
              <FontAwesomeIcon icon={faChartLine} size="3x" />
              <h5>Business Analyst</h5>
              <p>154 Jobs Available</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      {/* JOBS  */}
<Jobs/>
      {/* JOBS */}
{/* MILLIONS */}


{/* MILLIONS */}
      {/* Metrics Section */}
      <section className="container-fluid m-0 p-0 py-5 ">
        <h2 className="text-center mb-4">Our Achievements</h2>
        <div className="row text-center py-3 div1">
          <div className="col-lg-3 col-6">
            <FontAwesomeIcon icon={faUsers} size="3x" />
            <h1>{recruiters}</h1>
            <p>Recruiters</p>
          </div>
          <div className="col-lg-3 col-6">
            <FontAwesomeIcon icon={faUserFriends} size="3x" />
            <h1>{dailyUsers}</h1>
            <p>Daily Users</p>
          </div>
          <div className="col-lg-3 col-6">
            <FontAwesomeIcon icon={faBriefcase} size="3x" />
            <h1>{dailyJobs}</h1>
            <p>Daily Jobs</p>
          </div>
          <div className="col-lg-3 col-6">
            <FontAwesomeIcon icon={faSuitcase} size="3x" />
            <h1>{totalJobs}</h1>
            <p>Total Jobs</p>
          </div>
        </div>
      </section>
    </>
  );
}
