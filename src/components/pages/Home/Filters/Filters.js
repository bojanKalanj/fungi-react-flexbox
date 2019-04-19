import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchSpecies } from '../../../../actions';

import Form from '../../../../UI/Form/Form';

class Filters extends Component {

    componentDidMount() {
      this.props.fetchSpecies();
    }

    onFormSubmit = (event) => {
        event.preventDefault();
    }

    render(){
        return (
            <div>
                <form className="Form" onSubmit={this.onFormSubmit}>
                    <h4>Filteri</h4>
                    <div className="Input">
                      <select>
                        <option value="0">Izaberi vrstu</option>
                      </select>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        species: state.species
    };
};

export default connect(
    mapStateToProps,
    { fetchSpecies }
)(Filters);
