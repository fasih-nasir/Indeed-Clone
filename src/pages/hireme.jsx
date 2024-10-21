import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from '../auth/config'; // Firebase config
import { message } from 'antd'; // Ant Design for messages
import { db } from '../auth/config'; // Firestore config
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function Hireme() {
  const [userEmail, setUserEmail] = useState('');
  const [userUID, setUserUID] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [jobType, setJobType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser; // Get the current user
    console.log(user);

    if (user) {
      // User is authenticated, set the email and UID
      setUserEmail(user.email);
      setUserUID(user.uid);
    } else {
      // User is not authenticated, show an error message and redirect to "/"
      message.error('User not authenticated. Please log in.');
      navigate('/'); // Redirect to home page
    }
  }, [navigate]); // Run once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Create a reference to the hireme collection
      const hiremeCollection = collection(db, 'hireme');

      // Add a new document with the form data
      await addDoc(hiremeCollection, {
        jobTitle,
        jobDescription,
        contactNumber,
        jobCategory,
        jobType,
        experienceLevel,
        userEmail,
        userUID,
        postedTime: new Date().toLocaleString() // Store the posted time
      });

      message.success('Your hire request has been submitted successfully!'); // Show success message

      // Reset the form fields
      setJobTitle('');
      setJobDescription('');
      setContactNumber('');
      setJobCategory('');
      setJobType('');
      setExperienceLevel('');
    } catch (error) {
      message.error('Error submitting your hire request. Please try again.'); // Show error message
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="container mt-5 my-5 py-5">
     <h2 className='text-center'>Hire Me</h2>
      <div className="row justify-content-center">
        <div className="col-6">
          <form onSubmit={handleSubmit} className="d-flex flex-column">
            <div className="mb-3">
              <label htmlFor="jobTitle" className="form-label">Job Title</label>
              <input
                type="text"
                className="form-control"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="jobDescription" className="form-label">Job Description</label>
              <textarea
                className="form-control"
                id="jobDescription"
                rows="3"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="contactNumber" className="form-label">Contact Number</label>
              <input
                type="text"
                className="form-control"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="jobCategory" className="form-label">Job Category</label>
              <select
                className="form-select"
                id="jobCategory"
                value={jobCategory}
                onChange={(e) => setJobCategory(e.target.value)}
                required
              >
                <option value="" disabled>Select Job Category</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="jobType" className="form-label">Job Type</label>
              <select
                className="form-select"
                id="jobType"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                required
              >
                <option value="" disabled>Select Job Type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="experienceLevel" className="form-label">Experience Level</label>
              <select
                className="form-select"
                id="experienceLevel"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                required
              >
                <option value="" disabled>Select Experience Level</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
