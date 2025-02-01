import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './postcard.scss';

class PostCard extends Component {
    render() {
        const {key, id, title, description, imgUrl} = this.props;
        return (
            
                <Link to={`/post/${id}`} className="postcard" style={{backgroundImage: `url(http://localhost:9000/uploads/${imgUrl})`}}>
                    <div className="postcard__info-overlay">
                        <div className="postcard__info-overlay__content">
                            
                            <h2>{title}</h2>
                            <p>{description}</p>

                        </div>
                        
                    </div>
                </Link>

        );
    }
}

export default PostCard;