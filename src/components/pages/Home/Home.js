import React from 'react';
import { connect } from 'react-redux';
import { fetchObservations } from '../../../actions';

import { Card, CardBody } from '../../../UI/Card/Card';
import HomeCard from './HomeCard/HomeCard';
import { FlexContainer } from '../../../UI/Container/Container';
import Spinner from '../../../UI/Spinner/Spinner';

class Home extends React.Component{
    componentDidMount(){
        this.props.fetchObservations();
    }

    render(){
         const showObservations = () => {
            if(this.props.state.observations.length !== 0){
                let observations = this.props.state.observations.data
                console.log(observations)
                return observations.map(obs => {
                    return <HomeCard 
                            key={obs.id} 
                            id={obs.id}
                            number={obs.attributes.number}
                            speciesTitle={obs.relationships.species.data} 
                            determinator={obs.relationships.determinator.data}
                            addedAt={obs.attributes.observed_at.slice(0, 10)} />
                })
            }else{
                return <Spinner />
            }
        }

        return(
            <FlexContainer>
                <Card width="23%">
                    <CardBody>
                        
                    </CardBody>
                </Card>
                <div style={{ width: '75%' }}>
                    <FlexContainer>
                        { showObservations() }
                    </FlexContainer>
                </div>
            </FlexContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    };
};

export default connect(
    mapStateToProps,
    { fetchObservations }
)(Home);



