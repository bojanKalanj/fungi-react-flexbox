import React from 'react';
import { connect } from 'react-redux';
import { fetchObservationsCount, fetchObservations } from '../../../actions';
import moment from 'moment';

import HomeCard from './HomeCard/HomeCard';
import Filters from './Filters/Filters';
import { FlexContainer } from '../../../UI/Container/Container';
import Spinner from '../../../UI/Spinner/Spinner';
import Pagination from '../../shared/Pagination/Pagination'

class Home extends React.Component{
    componentDidMount(){
        this.props.fetchObservationsCount();
        this.props.fetchObservations(1);
    }

    componentWillReceiveProps = newProps => {
        if(newProps.observations.observationsArray){
            this.setState({ observations: newProps.observations.observationsArray });
        }
    }

    state = {
        observations: null,
        currentPage: 1
    }

    renderGrid() {
        const {observations} = this.state; 
        if(observations) {
            return observations.map(observation => {
                return (
                    <HomeCard
                        key={observation.id}
                        id={observation.id}
                        number={observation.attributes.number}
                        thumbImg={observation.attributes.images[0]}
                        speciesTitle={observation.attributes.species_name}
                        determinator={observation.relationships.determinator.data}
                        legator_username={observation.attributes.legator_username}
                        addedAt={moment(observation.attributes.observed_at).format("DD-MMM-YYYY")}
                    />
                );
            });
        } else {
            return <Spinner />
        }
    }

    getPaginationPageIndex = index => {
        this.props.fetchObservations(index);
    }

    changeCurrentPage = currentPage => {
        this.setState({ currentPage: currentPage })
    }

    renderPagination() {
        if(this.props.observations.observationsArray){
            return (
                <Pagination
                    itemsPerPage={20}
                    numberOfAllItems={this.props.state.observationCount.count}
                    getPaginationPageIndex={this.getPaginationPageIndex}
                    changeCurrentPage={this.changeCurrentPage}
                    currentPage={this.state.currentPage}
                />
            )
        }else{
            return null
        }
    }

    toggleFilter(filterName) {
      this.props.fetchObservations(1);
    }

    render() {
        return (
            <FlexContainer>
                <div style={{width: "23%", color: "#3cc47c"}}>
                    <Filters />
                </div>
                <div style={{ width: '75%' }}>
                    <FlexContainer>
                        { this.renderGrid() }
                    </FlexContainer>
                    { this.renderPagination() }
                </div>
            </FlexContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        observations: state.observations,
        observationsCount: state.observationsCount,
        currentPage: state.currentPage,
        activeFilters: state.filters
    };
};

export default connect(
    mapStateToProps,
    {
      fetchObservationsCount,
      fetchObservations
    }
)(Home);
