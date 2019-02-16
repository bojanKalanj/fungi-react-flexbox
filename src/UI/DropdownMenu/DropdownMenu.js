import React from 'react';
import './DropdownMenu.css';
import Navlink from '../Navlinks/Navlink';

const DropdownMenu = (props) =>  {
    let cssClasses = ["DropdownMenu"]
    if(props.show){
        cssClasses.push("ShowDropdown")
    }
    return(
        <div className={cssClasses.join(' ')}>
            <ul>
                <li>
                    <Navlink to="/">
                        Pocetna
                    </Navlink>
                </li>
                <li>
                    <Navlink to="/">
                        Pocetna
                    </Navlink>
                </li>
                <li>
                    <Navlink to="/">
                        Pocetna
                    </Navlink>
                </li>
                <li>
                    <Navlink to="/">
                        Pocetna
                    </Navlink>
                </li>
                <li>
                    <Navlink to="/">
                        Pocetna
                    </Navlink>
                </li>
            </ul>
        </div>
    )
}

export default DropdownMenu;