import React, { Component } from 'react';

class SvgIcon extends Component {
    
    render(){
        const { id, className} = this.props;
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={className}>
                <use href={id}></use>
            </svg>

        );
    }    
}

export default SvgIcon; 