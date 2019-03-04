import React from 'react';
import './DropdownMenu.css';
import Navlink from '../Navlinks/Navlink';

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
                    <Navlink to={`/users/${userID}`}>
                        Moj profil
                    </Navlink>
                </li>
                <li>
                    <Navlink to="/observations/new">
                        Dodaj observaciju 
                    </Navlink>
                </li>
                <li>
                    <Navlink to="/logout">
                        Odjavi se 
                    </Navlink>
                </li>
            </ul>
        </div>
    )
}

export default DropdownMenu;