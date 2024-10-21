import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../auth/config'; // Ensure you have this import
import '../App.css';

export default function Findjob() {
  const [jobPosts, setJobPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      const jobCollection = collection(db, 'jobpost');
      const jobSnapshot = await getDocs(jobCollection);
      const jobs = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobPosts(jobs);
      setFilteredJobs(jobs); // Initially set filtered jobs to all jobs

      // Extract distinct categories from job posts
      const distinctCategories = [...new Set(jobs.map(job => job.jobCategory))];
      setCategories(distinctCategories);
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    // Filter jobs based on selected filters
    const filterJobs = () => {
      let jobs = jobPosts;

      if (selectedCategory) {
        jobs = jobs.filter(job => job.jobCategory === selectedCategory);
      }

      if (selectedJobType) {
        jobs = jobs.filter(job => job.jobType === selectedJobType);
      }

      if (selectedExperienceLevel) {
        jobs = jobs.filter(job => job.experienceLevel === selectedExperienceLevel);
      }

      setFilteredJobs(jobs);
    };

    filterJobs();
  }, [selectedCategory, selectedJobType, selectedExperienceLevel, jobPosts]);

  // Function to clear filters
  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedJobType('');
    setSelectedExperienceLevel('');
    setFilteredJobs(jobPosts); // Reset the filtered jobs to show all jobs
  };

  // Function to handle WhatsApp redirect
  const handleApplyNow = (job) => {
    const whatsappNumber = job.contactNumber; // Get the contact number from the job post
    const message = `Hello, I'm interested in the ${job.jobTitle} position.\n\nJob Details:\nCategory: ${job.jobCategory}\nType: ${job.jobType}\nExperience Level: ${job.experienceLevel}\nDescription: ${job.jobDescription}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container-fluid p-0">
      <div className="row m-0">
        <div className="col-md-3 div5 p-3">
          <h3 className="text-center">Job Filters</h3>

          <div className="mb-3 mt-5">
            <select
              id="jobCategory"
              className="form-select"
              onChange={e => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              <option value="" disabled>Select Job Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <select
              id="jobType"
              className="form-select"
              onChange={e => setSelectedJobType(e.target.value)}
              value={selectedJobType}
            >
              <option value="" disabled>Select Job Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div className="mb-3">
            <select
              id="experienceLevel"
              className="form-select"
              onChange={e => setSelectedExperienceLevel(e.target.value)}
              value={selectedExperienceLevel}
            >
              <option value="" disabled>Select Experience Level</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          <button className="btn btn-secondary w-100 mt-3" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>

        <div className="col-md-9 p-3">
          <div className="row g-4">
            {filteredJobs.map(job => (
              <div className="col-md-4" key={job.id}>
                <div className="card">
                  <div className="card-body">
                    <p className="card-text"><strong>Posted by:</strong> {job.username || 'Unknown'}</p>
                    <h5 className="card-title">{job.jobTitle}</h5>
                    <p className="card-text">
                      <strong>Category:</strong> {job.jobCategory}<br />
                      <strong>Type:</strong> {job.jobType}<br />
                      <strong>Level:</strong> {job.experienceLevel}<br />
                      <strong className=''>Description:</strong> <span className='text-truncate col-4'> {job.jobDescription.split(" ").slice(0,6).join(" ")}</span>

                      <br />
                    <span><strong>Time</strong> :{job.postedTime.split(" ").slice(3,5).join(" ")}</span>
                    </p>
                    <button className="btn btn-primary w-100" onClick={() => handleApplyNow(job)}>
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
