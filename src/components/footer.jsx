import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

// import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS

const Footer = () => {
  const location = useLocation(); // React Router's hook to get the current location

  // Check if the current path starts with /auth
  const isAuthPath = location.pathname.startsWith('/auth');

  // Don't render the footer if the current path starts with /auth
  if (isAuthPath) return null;

  return (
    <footer className="text-gray-600 body-font">
    <div className="container-fluid px-5 py-8 mx-auto d-flex align-items-center flex-column flex-sm-row">
    <a className="navbar-brand col-2" href="/">
              <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '100px' }} />
            </a>
      
      <span className="d-flex ms-sm-auto mt-4 justify-content-center justify-content-sm-start">
     <p>Fasih-Nasir</p>
      </span>
    </div>
  </footer>
  
  );
};

export default Footer;
