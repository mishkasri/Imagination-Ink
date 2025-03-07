import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Menu from './Menu';
import './StoryDetail.css';

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`http://localhost:3002/stories/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStory(data);
      } catch (error) {
        console.error('Error fetching story:', error);
        setError('Error fetching story');
      }
    };

    fetchStory();
  }, [id]);

  return (
    <div className="story-detail-page">
      <Menu />
      <div className="story-detail-container">
        {error && <p className="error">{error}</p>}
        {story ? (
          <div>
            <h1>{story.title}</h1>
            <p>{story.content}</p>
          </div>
        ) : (
          <p>Loading story...</p>
        )}
      </div>
    </div>
  );
};

export default StoryDetail;
