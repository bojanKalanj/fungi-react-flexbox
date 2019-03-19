import React, { Component } from 'react';
import './MultiSelectDropdown.css';
import FontAwesome from 'react-fontawesome';
import onClickOutside from "react-onclickoutside";

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

    toggleItem = (id, selectedItem) => {
        let selectedValues = [...this.state.selectedValues];
        // console.log(selectedItem)
        // selectedItem.selected = true;
        selectedItem.selected = !selectedItem.selected;
        if(selectedItem.selected){
            selectedValues.push(selectedItem);
            // this.props.toggleItem(id)
        }else{
            const index = selectedValues.indexOf(selectedItem);

            if (index !== -1) {
                selectedValues.splice(index, 1);
            }
        }
        this.setState({ selectedValues: selectedValues });
        this.props.toggleItem(selectedValues);
    }

    render(){
        const list = this.props.list;
        const{listOpen, headerTitle} = this.state
        console.log(this.props.list);
        console.log("MultiSelectDropdown")
        return(
            <div className="dd-wrapper">
                <div className="dd-header" onClick={() => this.toggleList()}>
                    <div className="dd-header-title">{headerTitle } <span className="pull-right">{listOpen? <FaAngleUp />: <FaAngleDown />}</span> </div>
                </div>
                {listOpen && <ul className="dd-list">
                    {list.map((item) => (
                    <li className="dd-list-item" 
                        key={item.id} 
                        onClick={() => this.toggleItem(item.id, item)}>
                            {item.attributes.name} {item.selected? <FaCheck />: null}
                    </li>
                    ))}
                </ul>}
            </div>
        )
    }
}

export default MultiSelectDropdown;