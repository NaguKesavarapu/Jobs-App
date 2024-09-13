import React from 'react';
import './index.css';

const JobDetail = ({ job, onClose }) => {
  return (
    <div className="job-detail">
      <h2 className="job-title">{job.title || 'Not specified'}</h2>
      <p className="job-description">Location: {job.primary_details?.Place || 'Not specified'}</p>
      <p className="job-description">Salary: {job.primary_details?.Salary || 'Not specified'}</p>
      <p className="job-description">Job Type: {job.primary_details?.Job_Type || 'Not specified'}</p>
      <p className="job-description">Experience: {job.primary_details?.Experience || 'Not specified'}</p>
      <p className="job-description">Qualification: {job.primary_details?.Qualification || 'Not specified'}</p>
      <p className="job-description">{job.other_details || 'Not specified'}</p>
      <a href={job.custom_link || 'Not specified'} target="_blank" rel="noopener noreferrer">Contact HR</a>
      <button onClick={onClose} className="back-button">Back</button>
    </div>
  );
};

export default JobDetail;
