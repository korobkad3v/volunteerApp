import React, { Component } from "react";
import './postcard.scss';

class PostCard extends Component {
    render() {
        const {title, description, imgUrl} = this.props;
        return (
            <div className="postcard" style={{backgroundImage: `url(${imgUrl})`}}>
                <div className="postcard__info-overlay">
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </div>
        );
    }
}

export default PostCard;