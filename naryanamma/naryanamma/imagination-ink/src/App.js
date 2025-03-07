import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import AddStory from './components/AddStory';
import ShowStories from './components/ShowStories';
import Chat from './components/Chat';
import StoryDetail from './components/StoryDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-story" element={<AddStory />} />
          <Route path="/show-stories" element={<ShowStories />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/stories/:id" element={<StoryDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
