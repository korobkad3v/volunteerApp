import React, { Component } from 'react';
import NavBar from './components/navbar/NavBar';
import Header from './components/header/Header';
import PostCard from './components/postcard/PostCard';
import './normalize.css';
import './app.scss';


class App extends Component {
    render() {
        const products = [
            { id: 1, title: 'title 1', description: 'Description 1', imageUrl: 'https://randomwordgenerator.com/img/picture-generator/fantasy-3146946_640.jpg' },
            { id: 2, title: 'title 2', description: 'Description 2', imageUrl: 'https://via.placeholder.com/500x500' },
            { id: 3, title: 'title 3', description: 'Description 3', imageUrl: 'https://via.placeholder.com/324x234' },
            { id: 4, title: 'title 4', description: 'Description 4', imageUrl: 'https://via.placeholder.com/324x234' },
            { id: 5, title: 'title 4', description: 'Description 4', imageUrl: 'https://via.placeholder.com/324x234' }
        ];

        return (
            <div className="app">
                <svg xmlns="http://www.w3.org/2000/svg" display={"none"}>
                    <symbol id="home">
                    <path d="M16.5 9.15292V10.2937C16.5 13.2193 16.5 14.6822 15.6213 15.5911C14.7427 16.5 13.3284 16.5 10.5 16.5H7.5C4.67157 16.5 3.25736 16.5 2.37868 15.5911C1.5 14.6822 1.5 13.2193 1.5 10.2937V9.15292C1.5 7.43662 1.5 6.57846 1.8894 5.86705C2.2788 5.15566 2.99021 4.71413 4.41302 3.8311L5.91302 2.90015C7.41704 1.96672 8.16907 1.5 9 1.5C9.83092 1.5 10.5829 1.96672 12.087 2.90015L13.587 3.83109C15.0098 4.71413 15.7212 5.15566 16.1106 5.86705" stroke="#F4F7FF" stroke-width="2" stroke-linecap="round"/>
                    <path d="M11.25 13.5H6.75" stroke="#F4F7FF" strokeWidth="2" strokeLinecap="round"/>
                    </symbol>
                    <symbol id="plus">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.75 10.625H10.625V13.75C10.625 14.0938 10.3456 14.375 10 14.375C9.65438 14.375 9.375 14.0938 9.375 13.75V10.625H6.25C5.90438 10.625 5.625 10.3438 5.625 10C5.625 9.65625 5.90438 9.375 6.25 9.375H9.375V6.25C9.375 5.90625 9.65438 5.625 10 5.625C10.3456 5.625 10.625 5.90625 10.625 6.25V9.375H13.75C14.0956 9.375 14.375 9.65625 14.375 10C14.375 10.3438 14.0956 10.625 13.75 10.625ZM10 0C4.47688 0 0 4.475 0 10C0 15.525 4.47688 20 10 20C15.5231 20 20 15.525 20 10C20 4.475 15.5231 0 10 0Z" fill="#F4F7FF"/>

                    </symbol>
                </svg>
                <Header />
                <main className="main-container">
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
                </main>
            </div>
        );
    }
}

export default App;