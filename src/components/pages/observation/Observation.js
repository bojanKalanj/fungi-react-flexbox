import React from 'react';
import { connect } from 'react-redux';

import {fetchObservation} from '../../../actions';
import { FlexContainer } from '../../../UI/Container/Container';
import { Card, CardBody } from '../../../UI/Card/Card';
import { TitleLinks } from '../../../UI/AnchorTag/AnchorTag';
import UserAvatar from '../User/UserAvatar/UserAvatar';
import uerAvatarPlaceholderImg from '../../../assets/hari.jpg';
import List from '../../../UI/List/List';
import Comments from '../../shared/Comments/Comments';

class Observation extends React.Component {
    componentDidMount = () => {
        this.props.fetchObservation(this.props.match.params.id)
    }

    render(){
        if(this.props.observation){
            // return this.props.observation.data.relationships.species.data;
            console.log(this.props.observation.data.attributes.species_name);
        }
        const showObservation = () => {
            if(this.props.observation){
                // console.log(this.props.observation)
            }
        }

        const showTitle = () => {
            if(this.props.observation){
                if(this.props.observation.data.relationships.species.data){
                    // return this.props.observation.data.relationships.species.data;
                    return this.props.observation.data.attributes.species_name;
                }else{
                    return `Nalaz #${this.props.observation.data.attributes.number}`
                }
            }
        }

        const showDescription = () => {
            if(this.props.observation){
                return this.props.observation.data.attributes.description
            }
        }

        const showList = () => {
            if(this.props.observation){
                return <List width="32%" toList={this.props.observation.data.attributes}/>
            }
        }
        return (
            <div>
                <TitleLinks to="">
                    { showTitle() }
                </TitleLinks>
                { showObservation() }
                <FlexContainer>
                    <div style={{width: '42%'}}>
                        <Card>
                            <CardBody>
                                { showDescription() }
                            </CardBody>
                        </Card>
                        <Comments></Comments>
                    </div>
                    { showList() }
                    <Card width="22%">
                        <CardBody>
                            <UserAvatar 
                                src={uerAvatarPlaceholderImg} 
                                alt="uerAvatarPlaceholderImg"
                                userName="Hari Kalanj"/>
                                <hr />
                                <p>
                                    
                                </p>
                        </CardBody>
                    </Card>
                </FlexContainer>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        observation: state.observation.observation
    };
};

export default connect(mapStateToProps, { fetchObservation })(Observation);



