import React from 'react';
import './DropdownMenu.css';
// import Link from '../Links/Navlink';
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
                <li>
                    <Link to="/observations/new">
                        Dodaj nalaz 
                    </Link>
                </li>
                <li>
                    <Link to={`/users/${userID}`}>
                        Moj profil
                    </Link>
                </li>
                <li>
                    <Link to="/logout">
                        Odjavi se 
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default DropdownMenu;