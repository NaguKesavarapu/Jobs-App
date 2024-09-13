import React, { useState, useEffect, useCallback } from 'react';
import JobDetail from '../JobDetail';
import './index.css';

const Jobs = ({ addBookmark }) => {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // To determine if there are more jobs to fetch

  // Use useCallback to ensure fetchJobs is stable across renders
  const fetchJobs = useCallback(async () => {
    if (!hasMore) return; // Exit if there are no more jobs to fetch

    setLoading(true);
    try {
      const response = await fetch(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      const data = await response.json();
      
      if (data.results.length === 0) {
        setHasMore(false); // No more jobs to fetch
      } else {
        setJobs((prevJobs) => [...prevJobs, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      setError('Failed to fetch jobs.');
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]); // Dependencies: page and hasMore

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]); // Fetch jobs only once when the component mounts and when fetchJobs changes

  const handleBookmark = (job) => {
    addBookmark(job);
  };

  const handleJobClick = (job) => {
    setCurrentJob(job);
  };

  const handleLoadMore = () => {
    fetchJobs();
  };

  return (
    <div className="jobs-container">
      {currentJob ? (
        <JobDetail job={currentJob} onClose={() => setCurrentJob(null)} />
      ) : (
        <div>
          {jobs
            .filter((job) => job.title) // Filter out jobs without a title
            .map((job) => (
              <div key={job.id} className="job-card" onClick={() => handleJobClick(job)}>
                <h3>{job.title}</h3>
                <button onClick={(e) => { e.stopPropagation(); handleBookmark(job); }}>
                  Bookmark
                </button>
              </div>
            ))
          }
          {loading && <p className="loading">Loading...</p>}
          {error && <p>{error}</p>}
          {hasMore && <button onClick={handleLoadMore} className="load-more-btn">Load More</button>}
        </div>
      )}
    </div>
  );
};

export default Jobs;
