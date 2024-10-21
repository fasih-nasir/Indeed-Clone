// Import necessary libraries
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { auth, onAuthStateChanged, signOut } from '../auth/config'; // Firebase auth
import { db } from '../auth/config'; // Firestore config
import { doc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'; // Firestore functions
import { useNavigate } from 'react-router-dom'; // Navigation

export default function Dash() {
  const [userData, setUserData] = useState(null); // State to store user details
  const [userJobPosts, setUserJobPosts] = useState([]); // State to store user's job posts
  const navigate = useNavigate();

  // Fetch user data and job posts on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch user data
        const userDoc = doc(db, 'users', currentUser.uid);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data());
        }

        // Fetch job posts for the current user
        const jobQuery = query(
          collection(db, 'jobpost'),
          where('uid', '==', currentUser.uid) // Match the logged-in user's UID
        );
        const jobSnapshot = await getDocs(jobQuery);
        const jobs = jobSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUserJobPosts(jobs.slice(0, 5)); // Show only the first 5 job posts
      } else {
        navigate('/'); // Redirect to home if user is not signed in
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, [navigate]);

  // Handle user logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  // Function to delete a specific job post
  const handleDeleteJob = async (jobId) => {
    try {
      await deleteDoc(doc(db, 'jobpost', jobId)); // Delete the job post from Firestore
      setUserJobPosts((prevJobs) => prevJobs.filter((job) => job.id !== jobId)); // Remove the job from the state
    } catch (error) {
      console.error('Error deleting job post:', error);
    }
  };

  // Function to format Firestore timestamp
  const formatPostedTime = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000); // Convert Firestore timestamp to JS Date
      return date.toLocaleString(); // Format date as readable string
    } else {
      return 'Unknown Date'; // Handle invalid or missing timestamp
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left Sidebar (col-3) */}
        <div className="col-3 bg-light border-end vh-100 d-flex flex-column">
          {/* Logo */}
          <a className="navbar-brand-das col-12 mb-3 py-2" href="/">
            <img src={logo} alt="Logo" className="img-fluid col-3" />
          </a>

          {/* User Profile */}
          <div className="text-center mb-4">
            {userData && (
              <img
                src={userData.profilePicture}
                alt="Profile"
                className="col-8 userpr img-fluid"
              />
            )}
          </div>

          {/* User Info */}
          <div className="mb-4 py-4 px-2">
            {userData && (
              <>
                <h4 className="text-center py-3"><b>Your Details</b></h4>
                <p>Name: {userData.name}</p>
                <p>Email: {userData.email}</p>
                <p>Phone: {userData.contact}</p>
              </>
            )}
          </div>

          {/* Logout Button */}
          <div className="mt-auto d-flex justify-content-center">
            <button className="btn mb-2 col-5" onClick={handleLogout}>
              Logout<i className="fa fa-sign-out px-2" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {/* Main Content (col-9) */}
        <div className="col-9 position-relative">
          <h2 className="text-center mt-5">Welcome to the Dashboard</h2>

          {/* User Job Posts */}
          <div className="row g-4 mt-4">
            {userJobPosts.length > 0 ? (
              userJobPosts.map((job) => (
                <div className="col-md-4" key={job.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{job.jobTitle}</h5>
                      <p className="card-text">
                        <strong>Category:</strong> {job.jobCategory}<br />
                        <strong>Type:</strong> {job.jobType}<br />
                        <strong>Level:</strong> {job.experienceLevel}<br />
                        <strong className=''>Description:</strong> <span className='text-truncate col-4'> {job.jobDescription.split(" ").slice(0,6).join(" ")}</span>
                     <br />
                        <span><strong>Time</strong> :{job.postedTime.split(" ").slice(3,5).join(" ")}</span>
                      </p>
                     
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No job posts available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
