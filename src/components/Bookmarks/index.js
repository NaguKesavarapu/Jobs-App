import React, { useState } from 'react';
import JobDetail from '../JobDetail';
import './index.css';

const Bookmarks = ({ bookmarkedJobs, removeBookmark }) => {
  const [currentJob, setCurrentJob] = useState(null);

  const handleJobClick = (job) => {
    setCurrentJob(job);
  };

  const handleRemoveBookmark = (jobId) => {
    if (removeBookmark) {
      removeBookmark(jobId);
    } else {
      console.error('removeBookmark function is not available');
    }
  };

  return (
    <div className="bookmarks-container">
      {currentJob ? (
        <JobDetail job={currentJob} onClose={() => setCurrentJob(null)} />
      ) : (
        <div>
          {bookmarkedJobs.length > 0 ? (
            bookmarkedJobs.map((job) => (
              <div key={job.id} className="bookmark-card">
                <h3 className="bookmark-title">{job.title}</h3>
                <div className="button-container">
                <button onClick={() => handleJobClick(job)} className="bookmark-button">View Details</button>
                <button onClick={() => handleRemoveBookmark(job.id)} className="bookmark-button">Remove</button>
                </div>
              </div>
            ))
          ) : (
            <p className="bookmark-message">No bookmarked jobs yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
