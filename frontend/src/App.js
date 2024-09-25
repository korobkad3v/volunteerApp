import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePostPage from './components/pages/createpostpage/CreatePostPage';
import HomePage from './components/pages/homepage/HomePage';
import './normalize.css';
import './app.scss';


class App extends Component {
    render() {
        return(
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create-post" element={<CreatePostPage />} />
                </Routes>
            </Router>
        );
        
    }
}

export default App;