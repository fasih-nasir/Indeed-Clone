import React, { useEffect, useState } from 'react';
import { db } from '../auth/config'; // Import Firestore config
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions
import { message } from 'antd'; // Ant Design for messages
// import './Seek.css'; // Assuming you have a CSS file for styling

export default function Seek() {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState(['Development', 'Design', 'Marketing']); // Example categories
  const [experienceLevels, setExperienceLevels] = useState(['junior', 'mid', 'senior']); // Example experience levels
  const [jobTypes, setJobTypes] = useState(['contract', 'full-time', 'part-time']); // Example job types
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobCollection = collection(db, 'hireme');
        const jobSnapshot = await getDocs(jobCollection);
        const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(jobList);
      } catch (error) {
        message.error('Error fetching job posts.');
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs by selected category, experience level, and job type
  const filteredJobs = jobs.filter(job => {
    const matchesCategory = selectedCategory ? job.jobCategory === selectedCategory : true;
    const matchesExperience = selectedExperience ? job.experienceLevel === selectedExperience : true;
    const matchesJobType = selectedJobType ? job.jobType === selectedJobType : true;
    return matchesCategory && matchesExperience && matchesJobType;
  });

  // Clear filters
  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedExperience('');
    setSelectedJobType('');
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 div5 py-5">
          <h5>Filters</h5>
          
          {/* Category Filter */}
          <select 
            className="form-select mb-3" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Experience Level Filter */}
          <select 
            className="form-select mb-3" 
            value={selectedExperience} 
            onChange={(e) => setSelectedExperience(e.target.value)} 
          >
            <option value="">All Experience Levels</option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          {/* Job Type Filter */}
          <select 
            className="form-select mb-3" 
            value={selectedJobType} 
            onChange={(e) => setSelectedJobType(e.target.value)} 
          >
            <option value="">All Job Types</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <button className="btn btn-secondary" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>

        <div className="col-10 py-2">
          <div className="row">
            {filteredJobs.map((job) => (
              <div key={job.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{job.jobTitle}</h5>
                    <p className="card-text">Description: {job.jobDescription}</p>
                    <p className="card-text">Experience Level: {job.experienceLevel}</p>
                    <p className="card-text">Job Type: {job.jobType}</p>
                    <p className="card-text">Posted on: {new Date(job.postedTime).toLocaleString()}</p>
                    <button>
                      <a href={`https://wa.me/${job.contactNumber}`} target="_blank" rel="noopener noreferrer" className="btn text-white">
                        Hire Me
                      </a>
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
