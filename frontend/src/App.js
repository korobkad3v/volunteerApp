import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import CreatePostPage from './components/pages/createpostpage/CreatePostPage';
import HomePage from './components/pages/homepage/HomePage';
import PostPage from './components/pages/postpage/PostPage';
import './normalize.css';
import './app.scss';



class App extends Component {
    render() {
        return(
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/new-post" element={<CreatePostPage />} />
                    <Route path="/post/:id" element={<PostPage />} />
                </Routes>
            </Router>
        );
        
    }
}

export default App;