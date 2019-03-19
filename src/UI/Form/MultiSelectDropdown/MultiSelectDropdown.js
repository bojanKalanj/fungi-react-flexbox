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
    componentWillReceiveProps = newProps => {
        console.log(newProps);
    }

    constructor(props){
        super(props)
        this.state = {
          listOpen: false,
          headerTitle: this.props.title,
          selectedValues: []
        }
      }

    // onClickOutside = () =>{
    //     console.log("handleClickOutside")
    //     this.setState({
    //         listOpen: false
    //     })
    // }
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
        let selectedValues = [...this.state.selectedValues];
        selectedItem.selected = !selectedItem.selected;
        if(selectedItem.selected){
            selectedValues.push(selectedItem);
        }else{
            const index = selectedValues.indexOf(selectedItem);

            if (index !== -1) {
                selectedValues.splice(index, 1);
            }
        }
        console.log(selectedValues);
        this.setState({ selectedValues: selectedValues });
    }

    render(){
        const list = this.props.list;
        const{listOpen, headerTitle} = this.state
        return(
            <div className="dd-wrapper">
                <div className="dd-header" onClick={() => this.toggleList()}>
                    <div className="dd-header-title">{headerTitle } <span className="pull-right">{listOpen? <FaAngleUp />: <FaAngleDown />}</span> </div>
                </div>
                {listOpen && <ul className="dd-list">
                    {list.map((item) => (
                    <li className="dd-list-item" 
                        key={item.id} 
                        onClick={() => this.toggleItem(item)}>
                            {item.attributes.name} {item.selected? <FaCheck />: null}
                    </li>
                    ))}
                </ul>}
            </div>
        )
    }
}

export default MultiSelectDropdown;