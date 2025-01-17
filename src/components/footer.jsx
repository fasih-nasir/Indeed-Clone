import React from 'react';
import { Link ,useLocation} from 'react-router-dom';
import logo from '../assets/logo.png';
import "../App.css"
// Make sure to provide the correct path to the logo

const Footer = () => {
  const location = useLocation(); // React Router's hook to get the current location

  // Check if the current path starts with /auth
  const isAuthPath = location.pathname.startsWith('/auth');
 if(isAuthPath){
  return
 }

  return (
    <footer className=" ">
      <div className="container py-5 d-flex flex-row justify-content-around ">
        <div className="flex-shrink-0 text-center text-md-start col-4">
          <Link to="/" className="d-flex align-items-center justify-content-center justify-content-md-start ">
            <img src={logo} alt="Logo" className="rounded-circle bg-white p-2" style={{ width: '50px', height: '50px' }} />
        
          </Link>
          <p className="mt-2 ">Your company's tagline or <br /> short description goes here.</p>
        </div>

        <div className="d-flex flex-row justify-content-end align-items-center col-8 ">
          <div className="px-5">
            <h6 className="text-uppercase fw-bolder"> Pages</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-decoration-none text-white ">Home</Link></li>
              <li><Link to="/contact" className="text-decoration-none text-white ">Contact</Link></li>
              <li><Link to="/" className="text-decoration-none text-white ">Sucess</Link></li>
              <li><Link to="/" className="text-decoration-none text-white ">Pages</Link></li>
            </ul>
          </div>
          <div className="px-5">
            <h6 className="text-uppercase fw-bolder">Find job</h6>
            <ul className="list-unstyled text-decoration-none">
              <li><Link to="/" className="text-decoration-none text-white">Job List</Link></li>
              <li><Link to="/" className="text-decoration-none text-white">Hire As</Link></li>
              <li><Link to="/" className="text-decoration-none text-white">Links</Link></li>
              <li><Link to="/" className="text-decoration-none text-white">Links</Link></li>
            </ul>
          </div>
          {/* <div className="px-5">
            <h6 className="text-uppercase">Categories</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="">First Link</Link></li>
              <li><Link to="/" className="">Second Link</Link></li>
              <li><Link to="/" className="">Third Link</Link></li>
              <li><Link to="/" className="">Fourth Link</Link></li>
            </ul>
          </div>
          */}
<div className="px-5">
  <input type="text" className='my-3' placeholder='Enter Your Email' name="" id="" />
  <div className="d-flex mt-2 mt-md-0 text-white mt-4">
            <a href="https://facebook.com" className=" text-white mx-2"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com" className="text-white mx-2"><i className="fab fa-twitter"></i></a>
            <a href="https://instagram.com" className=" mx-2 text-white"><i className="fab fa-instagram"></i></a>
            <a href="https://linkedin.com" className=" mx-2 text-white"><i className="fab fa-linkedin"></i></a>
          </div>
</div>
        </div>
      </div>

     
    </footer>
  );
};

export default Footer;
