import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

import NavBar from '../../navbar/NavBar';
import Header from '../../header/Header';

import './postpage.scss';

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let params = useParams();
        return (
            <Component {...props} params={params} />
        );
    }
    return ComponentWithRouterProp;
}

class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
        };
    }

    componentDidMount() {
        const { id:postId } = this.props.params;
        
        
        fetch(`http://localhost:9000/posts/${postId}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ post: data });
                
            })
            .catch(error => {
                console.error('Error fetching post:', error);
            });
    }
    
    render() {
        console.log(this.state.post);
        const { post } = this.state;
        if (!post) {
            return <div>Loading...</div>;
        }
        return (
            
            <div className="app">
                <Header />
                <main className="main-container">
                    <NavBar />
                    <div className="post-page">
                        <div className="post-page__image-container">
                            <img
                                className="post-page__image"
                                src={`http://localhost:9000/uploads/${post.image_url}`}
                                alt={post.title}
                            />
                            
                        </div>
                        <h2 className="post-page__title">{post.title}</h2>
                        <p className="post-page__short-desc">{post.short_desc}</p>
                        <div className="post-page__content">
                            <p>{post.content}</p>
                        </div>
                        <div className="post-page__contact">
                            <h3>Contact the Author</h3>
                            <p>Email: <a href={`mailto:${post.email}`}>{post.email}</a></p>
                        </div>
                    </div>
                </main>
            </div>
            
        );
    }
}

export default withRouter(PostPage);