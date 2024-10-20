// Import necessary libraries
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

import { auth, onAuthStateChanged, signOut } from '../auth/config'; // Firebase auth
import { db } from '../auth/config'; // Firestore config
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions
import { useNavigate } from 'react-router-dom'; // Navigation

export default function Dash() {
  // State to store user details
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = doc(db, 'users', currentUser.uid); // Reference the user doc using UID
        const userSnapshot = await getDoc(userDoc); // Get the document snapshot

        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data()); // Set user data in state
        }
      } else {
        navigate('/'); // Redirect to home if user is not signed in
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, [navigate]);

  // Handle user logout
  const handleLogout = async () => {
    await signOut(auth); // Sign out the user
    navigate('/'); // Redirect to home after logout
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left Sidebar (col-3) */}
        <div className="col-3 bg-light border-end vh-100 d-flex flex-column ">
          {/* Top Div: Profile Picture */}
          {/* <div className=""> */}
        <a className="navbar-brand-das col-12 mb-3 py-2 " href="/">
          <img src={logo} alt="Logo" className="img-fluid col-3"  />
        </a>
      {/* </div> */}
          <div className="text-center mb-4">
            {userData && (
              <img
                src={userData.profilePicture}
                alt="Profile"
                className="col-8 userpr  img-fluid"
               
              />
            )}
          </div>

          {/* Middle Div: User Info */}
          <div className="mb-4 py-4 px-2">
            {userData && (
              <>
                <h4 className='text-center py-3'><b> Your Detail</b></h4>
                <p>Name: {userData.name}</p>

                <p>Email: {userData.email}</p>
                <p>Phone: {userData.contact}</p>
              </>
            )}
          </div>

          {/* Bottom Div: Logout Button */}
          <div className="mt-auto d-flex justify-content-center">
            <button className="btn  mb-2 col-5" onClick={handleLogout}>
              Logout<i className="fa fa-sign-out px-2" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {/* Main Content (col-9) */}
        <div className="col-9">
          <h2 className="text-center mt-5">Welcome to the Dashboard</h2>
          {/* You can add content here */}
        </div>
      </div>
    </div>
  );
}
