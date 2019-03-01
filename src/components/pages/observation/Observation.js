import React from 'react';
import { connect } from 'react-redux';

import {fetchObservation} from '../../../actions';
import { FlexContainer } from '../../../UI/Container/Container';
import { Card, CardBody } from '../../../UI/Card/Card';
import UserAvatar from '../User/UserAvatar/UserAvatar';
import uerAvatarPlaceholderImg from '../../../assets/hari.jpg';
import Comments from '../../shared/Comments/Comments';

class Observation extends React.Component {
    componentDidMount = () => {
        this.props.fetchObservation(this.props.match.params.id)
    }

    render(){
        console.log(this.props.observation);

        
        const showObservation = () => {
            if(this.props.observation){
                console.log(this.props.observation)
            }
        }

        const showTitle = () => {
            if(this.props.observation){
                if(this.props.observation.data.relationships.species.data){
                    return this.props.observation.data.relationships.species.data;
                }else{
                    return `Observacija #${this.props.observation.data.attributes.number}`
                }
            }
        }
        return (
            <div>
                <h1>{ showTitle() }</h1>
                { showObservation() }
                <FlexContainer>
                    <div style={{width: '40%'}}>
                        <Card>
                            <CardBody>

                            </CardBody>
                        </Card>
                        <Comments></Comments>
                    </div>
                    <Card width="32%">
                        <CardBody>
                            
                        </CardBody>
                    </Card>
                    <Card width="20%">
                        <CardBody>
                            <UserAvatar 
                                src={uerAvatarPlaceholderImg} 
                                alt="uerAvatarPlaceholderImg"
                                userName="Hari Kalanj"/>
                                <hr />
                                <p>
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
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



