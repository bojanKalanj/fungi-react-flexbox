import React, { Component } from 'react';
import './MultiSelectDropdown.css';
import FontAwesome from 'react-fontawesome';
import onClickOutside from "react-onclickoutside";

// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';

class MultiSelectDropdown extends Component{
    constructor(props){
        super(props)
        this.state = {
          listOpen: false,
          headerTitle: this.props.title
        }
      }

    handleClickOutside = () =>{
        console.log("handleClickOutside")
        this.setState({
            listOpen: false
        })
    }
    
    toggleList(){
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }

    // toggleSelected = (id, key) => {
    //     let temp = this.state[key]
    //     temp[id].selected = !temp[id].selected
    //     this.setState({
    //       [key]: temp
    //     })
    //   }

    toggleItem = (id, isSelected) => {
        this.props.toggleItem(id, isSelected)
    }

    render(){
        const list = this.props.list;
        const{listOpen, headerTitle} = this.state
        console.log(this.props.list);
        return(
            <div className="dd-wrapper">
                <div className="dd-header" onClick={() => this.toggleList()}>
                    <div className="dd-header-title">{headerTitle } {listOpen? <FaAngleUp />: <FaAngleDown />} </div>
                </div>
                {listOpen && <ul className="dd-list">
                    {list.map((item) => (
                    <li className="dd-list-item" 
                        key={item.id} 
                        onClick={() => this.toggleItem(item.id, item.selected)}>
                            {item.attributes.name}
                    </li>
                    ))}
                </ul>}
            </div>
        )
    }
}

export default MultiSelectDropdown;