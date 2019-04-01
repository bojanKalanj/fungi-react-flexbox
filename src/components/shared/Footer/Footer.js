import React from 'react';
import './Footer.css';

import FaFacebook from 'react-icons/lib/fa/facebook';
import FaInstagram from 'react-icons/lib/fa/instagram';

const footer = props => {
    return(
        <div className="Footer">
            <div className="footer-list">
                <div className="footer-list-left">

                </div>
                <div className="footer-list-right">
                    <ul>
                        <li><p className="text-muted">Gljiva®</p></li>
                        <li><FaFacebook /></li>
                        <li><FaInstagram /></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default footer;