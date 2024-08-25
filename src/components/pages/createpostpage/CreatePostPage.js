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
            content: ''

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleImageDrop = this.handleImageDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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
        this.setState({
            image: file
        });
    }
    
      handleSubmit(event) {
        event.preventDefault();
        const { title, image, email, shortDesc, content } = this.state;
    
        // Пример отправки данных на сервер
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('email', email);
        formData.append('shortDesc', shortDesc);
        formData.append('content', content);
    
        fetch('/posts', {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
          .then(data => {
            console.log('Post created:', data);
            this.setState({
              title: '',
              image: null,
              email: '',
              shortDesc: '',
              content: ''
            });
          })
          .catch(error => console.error('Error:', error));
      }

    render() {
        
        return (
            <div className="app">
                <Header />

                <main className="main-container">
                    <NavBar />

                    <div className="create-post">
                        <form class="create-post__form" onSubmit={this.handleSubmit}>
                            <h1>New opportunity.</h1>
                            <div className="create-post__form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" name="title"  value={this.state.title} onChange={this.handleChange}/>
                            </div>

                            <div className="create-post__form-group create-post-page__form-group--image-dropzone"
                            onDrop={this.handleImageDrop}
                            onDragOver={(e) => e.preventDefault()}>
                                <label htmlFor="image"></label>
                                <div className="create-post__dropzone">
                                {this.state.image ? (
                                    <p className="create-post-page__dropzone-text">{this.state.image.name}</p>
                                    ) : (
                                    <p className="create-post-page__dropzone-text">Drag and drop an image here, or click to select one</p>
                                    )}
                                     <input
                                    type="file"
                                    onChange={(e) => this.setState({ image: e.target.files[0] })}
                                    className="create-post-page__dropzone-input"
                                    style={{ display: 'none' }}
                                    />
                                </div> 
                                
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}

export default CreatePostPage;