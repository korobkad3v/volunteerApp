import React, { Component } from 'react';

import NavBar from '../../navbar/NavBar';
import Header from '../../header/Header';

import './createpostpage.scss';


class CreatePostPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            image: null,
            email: '',
            shortDesc: '',
            content: '',
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleImageDrop = this.handleImageDrop.bind(this);
        this.handleImageSelect = this.handleImageSelect.bind(this);
        this.handleDropzoneClick = this.handleDropzoneClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.fileInputRef = React.createRef();

        this.apiUrl = "http://localhost:9000";
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleImageDrop(event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const imageUrl = URL.createObjectURL(file);
        this.setState({
            image: file, imageUrl
        });
    }

    handleImageSelect(event) {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        this.setState({ image: file, imageUrl });
    }

    handleDropzoneClick() {
        if (this.fileInputRef.current) {
            this.fileInputRef.current.click();
        }
    }

    validateForm() {
        const { title, image, email, shortDesc, content } = this.state;
        const errors = {};

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


        if (!title) errors.title = 'Title is required';
        if (!image) errors.image = 'Image is required';
        if (!email) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Invalid email format';
        }
        if (!shortDesc) errors.shortDesc = 'Short description is required';
        if (!content) errors.content = 'Content is required';

        this.setState({ errors });

        return Object.keys(errors).length === 0;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.validateForm()) {
            return;
        }

        const { title, image, email, shortDesc, content } = this.state;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('email', email);
        formData.append('shortDesc', shortDesc);
        formData.append('content', content);

        
        fetch(`${this.apiUrl}/create-post`, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            alert('Post created:')
            console.log('Post created:', data);
            this.setState({
                title: '',
                image: null,
                email: '',
                shortDesc: '',
                content: '',
                errors: {}
            });
        })
        .catch(error => console.error('Error:', error));
    }

    render() {
        const { title, email, shortDesc, content, errors } = this.state;

        return (
            <div className="app">
                <Header />

                <main className="main-container">
                    <NavBar />

                    <div className="create-post">
                        <form className="create-post__form" onSubmit={this.handleSubmit}>
                            <h1 className="create-post__title">New opportunity.</h1>

                            <div className="create-post__form-group">
                                <label htmlFor="title" className="create-post__label">Title</label>
                                <input 
                                    type="text" 
                                    id="title" 
                                    name="title"
                                    className="create-post__input"  
                                    value={title} 
                                    onChange={this.handleChange}
                                    placeholder="Enter title"
                                />
                                {errors.title && <p className="create-post__error">{errors.title}</p>}
                            </div>

                            <div className="create-post__form-group create-post-page__form-group--image-dropzone"
                                onClick={this.handleDropzoneClick}
                                onDrop={this.handleImageDrop}
                                onDragOver={(e) => e.preventDefault()}>
                                <label className="create-post__label" htmlFor="image">Upload Image</label>
                                <div className="create-post__dropzone">
                                    {this.state.image ? (
                                        <img 
                                            src={this.state.imageUrl} 
                                            alt="Uploaded Preview"
                                            className="create-post__dropzone-image"
                                        />
                                    ) : (
                                        <p className="create-post-page__dropzone-text">Drag and drop an image here, or click to select one</p>
                                    )}
                                    <input
                                        name="image"
                                        type="file"
                                        ref={this.fileInputRef}
                                        onChange={this.handleImageSelect}
                                        className="create-post__dropzone-input"
                                        accept="image/*"
                                    />
                                </div>
                                {errors.image && <p className="create-post__error">{errors.image}</p>}
                            </div>

                            <div className="create-post__form-group">
                                <label htmlFor="email" className="create-post__label">Email </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="create-post__input"
                                    value={email}
                                    onChange={this.handleChange}
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="create-post__error">{errors.email}</p>}
                            </div>

                            <div className="create-post__form-group">
                                <label htmlFor="shortDesc" className="create-post__label">Short Desc</label>
                                <input 
                                    type="text" 
                                    id="shortDesc" 
                                    name="shortDesc" 
                                    value={shortDesc}
                                    onChange={this.handleChange}
                                    className="create-post__input" 
                                    placeholder="Enter a short description"
                                />
                                {errors.shortDesc && <p className="create-post__error">{errors.shortDesc}</p>}
                            </div>

                            <div className="create-post__form-group">
                                <label htmlFor="content" className="create-post__label">Content</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={content}
                                    onChange={this.handleChange}
                                    className="create-post__textarea"
                                    placeholder="What's on your mind?"
                                />
                                {errors.content && <p className="create-post__error">{errors.content}</p>}
                            </div>

                            <button className="create-post__submit-btn" type="submit">Submit</button>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}

export default CreatePostPage;
