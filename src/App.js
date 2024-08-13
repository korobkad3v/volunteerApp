import React, { Component } from 'react';
import NavBar from './components/navbar/NavBar';
import Header from './components/header/Header';
import PostCard from './components/postcard/PostCard';
import './app.scss';


class App extends Component {
    render() {
        const products = [
            { id: 1, title: 'title 1', description: 'Description 1', imageUrl: 'https://randomwordgenerator.com/img/picture-generator/fantasy-3146946_640.jpg' },
            { id: 2, title: 'title 2', description: 'Description 2', imageUrl: 'https://via.placeholder.com/324x234' },
            { id: 3, title: 'title 3', description: 'Description 3', imageUrl: 'https://via.placeholder.com/324x234' },
            { id: 4, title: 'title 4', description: 'Description 4', imageUrl: 'https://via.placeholder.com/324x234' },
        ];

        return (
            <div className="app">F
                <Header />
                <div className="main-container">
                    <NavBar />
                    <div className="product-grid">
                        {products.map(product => (
                            <PostCard
                                key={product.id}
                                title={product.title}
                                description={product.description}
                                imgUrl={product.imageUrl}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;