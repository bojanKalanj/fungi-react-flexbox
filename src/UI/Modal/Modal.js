import React from 'react';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';

import mainImgPlaceholder from '../../assets/mushroom.jpg';
import img1 from '../../assets/download (1) - Copy.jpg';
import img2 from '../../assets/download (2) - Copy.jpg';
import img3 from '../../assets/download (3) - Copy.jpg';
import img4 from '../../assets/download (4) - Copy.jpg';
import img5 from '../../assets/download - Copy.jpg';

import './Modal.css';

const Modal = props => {
    let cssClasses=["Modal", ];

    if(props.showModal){
        cssClasses.push("show");
    }

    

    return <div className={cssClasses.join(' ')}>
                <div className="modal-content">
                    <FaAngleLeft className="arrow arrow-left"/>
                    <img 
                        className="mainImage" 
                        src={mainImgPlaceholder} 
                        alt="mainImgPlaceholder"/>
                    <div className="image-list">
                        <ul>
                            <li>
                                <img 
                                    className="img-preview" 
                                    src={mainImgPlaceholder} 
                                    alt="mainImgPlaceholder"/>
                            </li>
                            <li>
                                <img 
                                    className="img-preview" 
                                    src={img1} 
                                    alt="img1"/>
                            </li>
                            <li>
                                <img 
                                    className="img-preview" 
                                    src={img2} 
                                    alt="img2"/>
                            </li>
                            <li>
                                <img 
                                    className="img-preview" 
                                    src={img3} 
                                    alt="img3"/>
                            </li>
                            <li>
                                <img 
                                    className="img-preview" 
                                    src={img4} 
                                    alt="img4"/>
                            </li>
                            <li>
                                <img 
                                    className="img-preview" 
                                    src={img5} 
                                    alt="img5"/>
                            </li>
                        </ul>
                    </div>
                    <FaAngleRight className="arrow arrow-right"/>
                </div>
            </div>
}

export default Modal;