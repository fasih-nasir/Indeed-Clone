import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const jobs = [
    {
        title: "Software Engineer",
        company: "Tech Solutions Inc.",
        location: "San Francisco, CA",
    },
    {
        title: "Product Manager",
        company: "Innovate Corp.",
        location: "New York, NY",
    },
    {
        title: "UX Designer",
        company: "Creative Minds",
        location: "Los Angeles, CA",
    },
    {
        title: "Data Scientist",
        company: "Data Insights",
        location: "Austin, TX",
    },
    {
        title: "Web Developer",
        company: "Webify",
        location: "Chicago, IL",
    },
    {
        title: "Marketing Specialist",
        company: "Marketing Guru",
        location: "Seattle, WA",
    },
    {
        title: "DevOps Engineer",
        company: "Cloud Solutions",
        location: "Dallas, TX",
    },
    {
        title: "Business Analyst",
        company: "Insight Analytics",
        location: "Boston, MA",
    },
];

const JobCard = ({ job }) => {
    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <p className="card-text">
                    <FontAwesomeIcon icon={faBriefcase} /> {job.company}
                </p>
                <p className="card-text">
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {job.location}
                </p>
            </div>
        </div>
    );
};

const Jobs = () => {
    return (
        <div className="container">
            <h2 className="text-center my-4">Trendy Jobs</h2>
            <div className="row">
                {jobs.map((job, index) => (
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                        <JobCard job={job} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Jobs;
