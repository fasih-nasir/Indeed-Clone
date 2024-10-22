// CSS
import '../App.css';
import '../index.css';
// CSS

import React, { useState, useEffect } from 'react';
// REACT

// AUTH
import { auth, onAuthStateChanged } from '../auth/config';
// AUTH

// FIRESTORE
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../auth/config'; // Firestore config
// FIRESTORE

import { Link, useLocation } from 'react-router-dom';
// ASSETS
import logo from '../assets/logo.png';
// ASSETS

export default function Navbar() {
  // STATE
  const [user, setUser] = useState(null); // Track current user
  const [isFixed, setIsFixed] = useState(false); // State for handling navbar position
  const [profilePicture, setProfilePicture] = useState(''); // State to store the profile picture
  // STATE

  // CURRENT USER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser); // Set user if authenticated

      if (currentUser) {
        // Firestore query to get profile picture for the current user
        const q = query(collection(db, 'users'), where('email', '==', currentUser.email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setProfilePicture(data.profilePicture); // Assuming the field in Firestore is 'profilePicture'
        });
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);
  // CURRENT USER

  const location = useLocation(); // React Router's hook to get the current location

  // Check if the current path starts with /auth
  const isAuthPath = location.pathname.startsWith('/auth');

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 650) {
        setIsFixed(true); // Fix the navbar at the top after 650px scroll
      } else {
        setIsFixed(false); // Remove fixed position when above 650px
      }
    };

    window.addEventListener('scroll', handleScroll); // Add event listener

    // Cleanup the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isAuthPath ? (
        <div></div>
      ) : (
        // NAVBAR IS SHOWN HERE
        <nav
          className={`navbar navbar-expand-lg navbar-light bg-light ${
            isFixed ? 'fixed-top shadow-sm scrolled' : ''
          }`}
          style={{ transition: 'top 0.3s ease, background-color 0.3s ease' }}
        >
          <div className="container-fluid d-flex flex-row align-items-center justify-content-between px-4">
            {/* Left Logo */}
            <a className="navbar-brand col-2" href="/">
              <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '100px' }} />
            </a>

            {/* Toggler for mobile view */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Centered Navbar links */}
            <div className="collapse navbar-collapse justify-content-center col-7" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                    Home
                  </Link>
                </li>
                {/* Additional Navbar items like 'Find a Job', 'Candidates', etc. */}
                <li className="nav-item dropdown">
                  <Link
                    to="#"
                    className={`nav-link dropdown-toggle ${
                      location.pathname === '/findjob' ? 'active' : ''
                    }`}
                    id="findJobDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Find a Job
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/findjob">
                      Available Jobs
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/seekjob">
                      Job Seeker
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* <li className="nav-item dropdown">
                  <Link
                    to="#"
                    className={`nav-link dropdown-toggle ${
                      location.pathname === '/candidates' ? 'active' : ''
                    }`}
                    id="candidatesDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Candidates
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/candidate-list">
                        Candidate List
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/hire">
                        Hire a Candidate
                      </Link>
                    </li>
                  </ul>
                </li> */}

                <li className="nav-item dropdown">
                  <Link
                    to="#"
                    className={`nav-link dropdown-toggle ${
                      location.pathname === '/pages' ? 'active' : ''
                    }`}
                    id="pagesDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Pages
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/postjob">
                        Post a Job
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/hireme">
                        Hire Me
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link
                    to="/contact"
                    className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Side Profile Image and Sign In Button */}
            <div className="d-flex justify-content-end col-3">
              {user ? (
                <Link className="btn brt mx-2 col-4 d-flex align-items-center justify-content-between" to="/auth/dash">
                  {/* Profile Image */}
                  <img
                    src={profilePicture || 'default-profile.png'} // Default image if none is found
                    alt="Profile"
                    className="img-fluid col-8 "
                    
                  />
                  {/* Right Arrow */}
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </Link>
              ) : (
                <Link className="btn brt mx-2 col-4" to="/auth/login">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </nav>
        // NAVBAR IS SHOWN HERE
      )}
    </>
  );
}
