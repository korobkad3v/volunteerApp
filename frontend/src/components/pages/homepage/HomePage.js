
import React, { Component } from 'react';

import NavBar from '../../navbar/NavBar';
import Header from '../../header/Header';
import PostCard from '../../postcard/PostCard';

import './homepage.scss';


class HomePage extends Component {
    state = {
        posts: [],
        isLoading: true,
        error: null,
    };
    componentDidMount() {
        fetch("http://localhost:9000/posts").then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => this.setState({ posts: data, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    }
    render() {
        const { posts, isLoading, error } = this.state;
        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        console.log(posts);
        return (
            <div className="app">
                
                <Header />
                <main className="main-container">
                    <NavBar />
                    <div className="product-grid">
                        {posts.map(post => (
                            <PostCard
                                id={post.id}
                                title={post.title}
                                description={post.short_desc}
                                imgUrl={post.image_url}
                            />
                        ))}
                    </div>
                </main>
            </div>
        );
    }
}

export default HomePage