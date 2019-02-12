import React from 'react';
import { connect } from 'react-redux';

import {fetchObservation} from '../../../actions'

class Observation extends React.Component {
    componentDidMount = () => {
        this.props.fetchObservation(this.props.match.params.id)
    }

    render(){
        console.log(this.props.state.observation)
        const showObservation = () => {
            if(this.props.state.observation.data){
                console.log("i have observation")
            }
        }
        return (
            <div>
                { showObservation() }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    };
};

export default connect(mapStateToProps, { fetchObservation })(Observation);



