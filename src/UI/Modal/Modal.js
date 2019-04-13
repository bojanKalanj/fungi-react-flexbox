import React, { Component } from 'react';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaClose from 'react-icons/lib/fa/close';

import './Modal.css';

class Modal extends Component{
    componentWillMount = () => {
        console.log(this.props.images);
        let images = [];
        if(this.props.images){
            this.props.images.map(img => {
                images.push(`http://35.164.224.228${img}`)
            })
        }
        let mainImage = images[0];
        this.setState({
            images,
            mainImage
        })
    }

    state = {
        // showModal: true,
        images: [],
        mainImage: null
    }

    onClickClose = () => {
        this.props.onClickClose();
    }

    onImgPreviewClick = img => {
        let mainImage = img.target.src;
        this.setState({
            mainImage
        })
    }

    rightArrowClicked = () => {
        const { images } = this.state;
        let currentIndex = images.indexOf(this.state.mainImage);
        let mainImage = images[currentIndex + 1];

        if(currentIndex > images.length - 2){
            mainImage = images[0];
        }

        this.setState({
            mainImage
        })
    }

    leftArrowClicked = () => {
        const { images } = this.state;
        let currentIndex = images.indexOf(this.state.mainImage);
        let mainImage = images[currentIndex - 1];
        
        if(currentIndex === 0){
            mainImage = images[images.length - 1];
        }

        this.setState({
            mainImage
        })
    }

    render(){
        return <div className="Modal">
                <div className="modal-content">
                    <FaClose
                        className="icon-close" 
                        onClick={this.onClickClose}/>
                    <FaAngleLeft 
                        onClick={this.leftArrowClicked}
                        className="arrow arrow-left"
                        />
                    <img 
                        className="mainImage" 
                        src={this.state.mainImage} 
                        alt="mainImage"/>
                    <div className="image-list">
                        <ul>
                            {
                                this.state.images.map(img => {
                                    return <li>
                                                <img 
                                                    className="img-preview" 
                                                    src={img} 
                                                    alt={img}
                                                    onClick={(img) => this.onImgPreviewClick(img)}/>
                                            </li>
                                })
                            }
                        </ul>
                    </div>
                    <FaAngleRight 
                        className="arrow arrow-right"
                        onClick={this.rightArrowClicked}/>
                </div>
            </div>
    }
}

export default Modal;