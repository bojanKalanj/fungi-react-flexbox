import React, { Component } from 'react';
import Multiselect from 'multiselect-dropdown-react';


class MultiselectDropdown extends Component {
    componentWillReceiveProps = () => {
        // console.log(this.props.options);
    }
    state = {
        data: [{
            name: 'One',
            value: 'kurac'
          },
          {
              name: 'two',
              value: 'two'
            },
            {
              name: 'three',
              value: 'three'
            },
            {
              name: 'four',
              value: 'four'
            },
            {
              name: 'five',
              value: 'five'
            },
            {
              name: 'six',
              value: 'six'
            }]
    }
    
  result(params) {
    console.log(params);
  }
  render() {
    return (
      <div className="MultiselectDropdown">
        <Multiselect options={this.state.data} onSelectOptions={this.props.onSelectOptions} />
      </div>
    );
  }
}

export default MultiselectDropdown;
