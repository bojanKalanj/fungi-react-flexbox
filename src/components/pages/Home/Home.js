import React from 'react';
import { connect } from 'react-redux';
import { fetchObservations, paginateObservations } from '../../../actions';
import moment from 'moment';

import HomeCard from './HomeCard/HomeCard';
import Filters from './Filters/Filters';
import { FlexContainer } from '../../../UI/Container/Container';
import Spinner from '../../../UI/Spinner/Spinner';
import Pagination from '../../shared/Pagination/Pagination'

class Home extends React.Component{
    componentDidMount(){
        this.props.fetchObservations();
        this.props.paginateObservations(1);
        // if(this.props.state.observations){
        //     this.setState({ observations: this.props.state.observations.data });
        // }
    }

    // componentWillReceiveProps = newProps => {
    //     console.log(newProps)
    //     if(newProps.state.paginateObser){
    //         console.log(newProps.state.paginateObser.data);
    //         this.setState({ observations: newProps.state.paginateObser.data });
    //     }
    // }

    // state = {
    //     observations: null
    // }

    getPaginationPageIndex = index => {
        this.props.paginateObservations(index);
    }

    renderPagination = () => {
        if(this.props.state.observations){
            return <Pagination
                    itemsPerPage={20}
                    numberOfAllItems={this.props.state.observations.data.length}
                    getPaginationPageIndex={this.getPaginationPageIndex}/>
        }else{
            return null
        }
    }

    render(){
        // if(this.props.paginateObser.paginateObservations.observations){
        //     console.log(this.props.paginateObser.paginateObservations.observations.data);
        // }
        if(this.props.paginateObser.paginateObservations.observations){
            console.log(this.props.paginateObser.paginateObservations.observations.data);
        }
         const showObservations = () => {
            if(this.props.paginateObser.paginateObservations.observations){
                let observations = this.props.paginateObser.paginateObservations.observations.data;
                return observations.map(obs => {
                    return <HomeCard
                                key={obs.id}
                                id={obs.id}
                                number={obs.attributes.number}
                                speciesTitle={obs.attributes.species_name}
                                determinator={obs.relationships.determinator.data}
                                legator_username={obs.attributes.legator_username}
                                addedAt={moment(obs.attributes.observed_at).format("DD-MMM-YYYY")}
                            />
                })
            }else{
                return <Spinner />
            }
        }

        return(
            <FlexContainer>
                <div style={{width: "23%", color: "#3cc47c"}}>
                        <Filters />
                </div>
                <div style={{ width: '75%' }}>
                    { this.renderPagination() }
                    <FlexContainer>
                        { showObservations() }
                    </FlexContainer>
                    {/* { this.renderPagination() } */}
                </div>
            </FlexContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        paginateObser: state,
        state: state.observations
    };
};

export default connect(
    mapStateToProps,
    { fetchObservations,
      paginateObservations }
)(Home);
