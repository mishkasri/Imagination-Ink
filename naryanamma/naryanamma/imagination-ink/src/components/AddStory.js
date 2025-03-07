import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Menu from './Menu';
import './AddStory.css';

const AddStory = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handlePublish = async () => {
    if (title && content) {
      try {
        const response = await fetch('http://localhost:3002/add-story', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content }),
        });

        if (!response.ok) {
          throw new Error('Error publishing story');
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        setMessage('Failed to publish story');
      }
    } else {
      setMessage('Please enter both title and content.');
    }
  };

  return (
    <div>
      <Menu />
      <div className="add-story">
        <header className="header">
          <h1>Workshop</h1>
         
        </header>
        <div className="editor-container">
          <input
            type="text"
            className="story-title"
            placeholder="Story Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={AddStory.modules}
            formats={AddStory.formats}
            placeholder="Start writing your story..."
          />
        </div>
        <button className="publish-button" onClick={handlePublish}>
          Publish
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

AddStory.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']                                         
  ],
};

AddStory.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

export default AddStory;
