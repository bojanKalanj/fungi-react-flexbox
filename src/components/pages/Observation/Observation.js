import React from 'react';
import { connect } from 'react-redux';

import {fetchObservation} from '../../../actions';
import { FlexContainer } from '../../../UI/Container/Container';
import { Card, CardBody } from '../../../UI/Card/Card';
import { TitleLinks } from '../../../UI/AnchorTag/AnchorTag';
import Modal from '../../../UI/Modal/Modal';
import UserAvatar from '../User/UserAvatar/UserAvatar';
import uerAvatarPlaceholderImg from '../../../assets/hari.jpg';
import List from '../../../UI/List/List';
import Comments from '../../shared/Comments/Comments';
import './Observation.css';

class Observation extends React.Component {
    componentDidMount = () => {
        this.props.fetchObservation(this.props.match.params.id)
    }

    state = {
        showModal: false
    }

    onMainImageClick = () => {
        let showModal = true;
        this.setState({
            showModal
        })
    }

    onClickCloseModal = () => {
        let showModal = false;
        this.setState({
            showModal
        })
    }

    renderImages = () => {
        if(this.props.observation){
            if(this.props.observation.data.attributes.images.length > 0){
                console.log(this.props.observation.data.attributes.images);
                let image = this.props.observation.data.attributes.images[0];
                return <img
                        className="observation-image" 
                        src={`http://35.164.224.228${image}`} 
                        alt="img"
                        onClick={this.onMainImageClick}/>
            }else{
                return <p>Ovaj nalaz nema fotografija</p>
            }
        }
    }

    renderComments = () => {
        if(this.props.observation){
            return <Comments observationId={this.props.observation.data.id}/>
        }else{
            return null;
        }
    }

    render(){
        console.log(this.props.observation)
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
                return <List width="26%" toList={this.props.observation.data.attributes}/>
            }
        }
        return (
            <div>
                <h1>
                    <TitleLinks to="">
                        { showTitle() }
                    </TitleLinks>
                </h1>
                { showObservation() }
                <FlexContainer>
                    <div style={{width: '49%'}}>
                        <Card>
                            <CardBody>
                                { this.renderImages() }
                                {/* { showDescription() } */}
                            </CardBody>
                        </Card>
                        { this.renderComments() }
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
                                    { showDescription() }
                                </p>
                        </CardBody>
                    </Card>
                </FlexContainer>
                {this.state.showModal? 
                    <Modal 
                        images={this.props.observation.data.attributes.images}
                        showModal={this.state.showModal}
                        onClickClose={this.onClickCloseModal}
                        />: null}
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



