import React, { Component } from 'react';
import './MultiSelectDropdown.css';
// import FontAwesome from 'react-fontawesome';
// import onClickOutside from "react-onclickoutside";

// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import FaCheck from 'react-icons/lib/fa/check';

class MultiSelectDropdown extends Component{

    constructor(props){
        super(props)
        this.state = {
          listOpen: false,
          headerTitle: this.props.title,
          selectedValues: [],
        }
      }

    handleClick = (e) => {
        if(this.node.contains(e.target)){
            console.log("handleClick")
        }
    }
    
    toggleList(){
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }

    toggleItem = (selectedItem) => {
        this.props.toggleItem(selectedItem);
    }

    render(){
        const list = this.props.list;
        const {listOpen, headerTitle} = this.state;
        let selected = this.props.selected || [];
        let valuesToDisplay = [];
        for(let item in list){
            for(let s in selected){
                if(list[item].id === selected[s]){
                    valuesToDisplay.push(list[item].attributes.name);
                }
            }
        }
        return(
            <div>
                <ul className="tags">
                    {valuesToDisplay.map(s => {
                        return <div key={s} className="tag">{s}</div>
                    })}
                </ul>
                <div className="dd-wrapper">
                    <div className="dd-header" onClick={() => this.toggleList()}>
                        <div className="dd-header-title">{headerTitle } <span className="pull-right">{listOpen? <FaAngleUp />: <FaAngleDown />}</span> </div>
                    </div>
                    {listOpen && <ul className="dd-list">
                        {list.map((item) => (
                        <li className="dd-list-item" 
                            key={item.id} 
                            onClick={() => this.toggleItem(item)}>
                                {item.attributes.name} {selected.includes(item.id)? <FaCheck />: null}
                        </li>
                        ))}
                    </ul>}
                </div>
            </div>
        )
    }
}

export default MultiSelectDropdown;