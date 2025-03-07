import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import './ShowStories.css';

const ShowStories = () => {
  const [stories, setStories] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('http://localhost:3002/stories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }

        const data = await response.json();
        console.log('Fetched stories:', data);
        setStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  const handleCommentChange = (storyId, comment) => {
    setNewComment(comment);
    setComments({ ...comments, [storyId]: comment });
  };

  const handleAddComment = async (storyId) => {
    try {
      const response = await fetch(`http://localhost:3002/stories/${storyId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: comments[storyId] }),
      });

      if (!response.ok) {
        throw new Error('Error adding comment');
      }

      const updatedComments = await response.json();
      setStories((prevStories) =>
        prevStories.map((story) =>
          story._id === storyId ? { ...story, comments: updatedComments } : story
        )
      );
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <Menu />
      <h1>Stories</h1>
      <div className="stories-container">
        {stories.length > 0 ? (
          stories.map((story) => (
            <div key={story._id} className="story-card">
              <h2>{story.title}</h2>
              <div
                className="story-content"
                dangerouslySetInnerHTML={{ __html: story.content }}
              />
              <div className="comments">
                <h3>Comments</h3>
                <ul>
                  {(story.comments || []).map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
                <input
                  type="text"
                  value={comments[story._id] || ''}
                  onChange={(e) => handleCommentChange(story._id, e.target.value)}
                  placeholder="Add a comment"
                />
                <button onClick={() => handleAddComment(story._id)}>Add Comment</button>
              </div>
            </div>
          ))
        ) : (
          <p>No stories available</p>
        )}
      </div>
    </div>
  );
};

export default ShowStories;
