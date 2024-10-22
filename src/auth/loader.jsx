import React from 'react';
import { Link ,useLocation} from 'react-router-dom';
 
import './Loader.css'; // Import CSS for the loader

const Loader = () => {
    const location = useLocation(); // React Router's hook to get the current location

    // Check if the current path starts with /auth
    const isAuthPath = location.pathname.startsWith('/auth');
   if(isAuthPath){
    return
   }
  return (
    <div className="loader-container container-fluid d-flex justify-content-center align-items-center">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;