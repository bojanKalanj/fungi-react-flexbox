import React, { Component } from 'react';
import Multiselect from 'multiselect-dropdown-react';


class MultiselectDropdown extends Component {
    componentDidMount = () => {
      if(this.props.options){
        this.setState({ data: this.props.options })
      }
      // this.setState({ data: this.props.options })
      // console.log(this.props.options);
    }

    componentWillReceiveProps = newProps => {
      if(this.props.options){
        this.setState({ data: this.props.options })
      }
        // console.log(newProps.options);
        // console.log(this.props.options);
    }
    state = {
        data: []
    }
  
    renderMultiselect = () => {
      if(this.state.data.length > 0){
        return <Multiselect options={this.state.data} onSelectOptions={this.props.onSelectOptions} />
      }else{
        return null;
      }
    }
    
  result(params) {
    console.log(params);
  }
  render() {
    console.log(this.state.data)
    return (
      <div className="MultiselectDropdown">
        { this.renderMultiselect() }
        {/* <Multiselect options={this.state.data} onSelectOptions={this.props.onSelectOptions} /> */}
      </div>
    );
  }
}

export default MultiselectDropdown;
