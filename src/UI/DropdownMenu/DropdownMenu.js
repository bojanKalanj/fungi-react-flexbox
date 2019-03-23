import React from 'react';
import './DropdownMenu.css';
// import Link from '../Links/Navlink';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import FaUser from 'react-icons/lib/fa/user';
import FaClose from 'react-icons/lib/fa/close';
import { Link } from 'react-router-dom';

const DropdownMenu = (props) =>  {
    let cssClasses = ["DropdownMenu"]
    if(props.show){
        cssClasses.push("ShowDropdown")
    }
    const userID = props.userID;
    return(
        <div className={cssClasses.join(' ')}>
            <ul>
                <Link to="/observations/new">
                    <li><FaPlusCircle /> <span className="pull-right">Dodaj nalaz </span> </li>
                </Link>
                <Link to={`/users/${userID}`}>
                    <li><FaUser /> <span className="pull-right">Moj profil</span></li> 
                </Link>
                <Link to="/logout">
                    <li><FaClose /> <span className="pull-right">Odjavi se </span></li> 
                </Link>
            </ul>
        </div>
    )
}

export default DropdownMenu;