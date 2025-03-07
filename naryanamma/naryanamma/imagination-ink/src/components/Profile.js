import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch('http://localhost:3002/stories');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching stories:', error);
      setError('Error fetching stories');
    }
  };

  return (
    <div className="profile-page">
      <Menu />
      <div className="profile-container">
        <h1>Your Stories</h1>
        {error && <p className="error">{error}</p>}
        <div className="stories-list">
          {stories.length > 0 ? (
            stories.map((story) => (
              <div key={story._id} className="story-tile">
                <Link to={`/stories/${story._id}`}>
                  <h3>{story.title}</h3>
                </Link>
                <p>{story.content.substring(0, 100)}...</p>
              </div>
            ))
          ) : (
            <p>No stories to display</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
