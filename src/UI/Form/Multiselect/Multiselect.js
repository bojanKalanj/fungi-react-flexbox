import React, { Component } from 'react';
import Multiselect from 'multiselect-dropdown-react';


class MultiselectDropdown extends Component {
    // componentDidMount = () => {
    //   if(this.props.options){
    //     this.setState({ data: this.props.options })
    //   }
    // }

    // componentWillReceiveProps = newProps => {
    //   if(this.props.options){
    //     this.setState({ data: newProps.options })
    //   }
    // }
  
  render() {
    let options = [];
    if(this.props.options){
      options = this.props.options; 
    }
    
    return (
      <div className="MultiselectDropdown">
        { console.log(options) }
        <Multiselect options={options} onSelectOptions={this.props.onSelectOptions} /> 
      </div>
    );
  }
}

export default MultiselectDropdown;
