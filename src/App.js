import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Jobs from './components/Jobs';
import Bookmarks from './components/Bookmarks';
import './App.css';

const App = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  const addBookmark = (job) => {
    setBookmarkedJobs((prevBookmarks) => {
      if (prevBookmarks.find((item) => item.id === job.id)) {
        return prevBookmarks;
      }
      return [...prevBookmarks, job];
    });
  };

  const removeBookmark = (jobId) => {
    setBookmarkedJobs((prevBookmarks) =>
      prevBookmarks.filter((job) => job.id !== jobId)
    );
  };

  return (
    <Router>
      <div className="app">
        <div className="content">
          <Routes>
            <Route path="/jobs" element={<Jobs addBookmark={addBookmark} />} />
            <Route path="/bookmarks" element={<Bookmarks bookmarkedJobs={bookmarkedJobs} removeBookmark={removeBookmark} />} />
            <Route path="/" element={<Jobs addBookmark={addBookmark} />} />
          </Routes>
        </div>
        <div className="navbar">
          <Link to="/jobs" className="nav-link">Jobs</Link>
          <Link to="/bookmarks" className="nav-link">Bookmarks</Link>
        </div>
      </div>
    </Router>
  );
};

export default App;
