import React from 'react';

import { Card, CardBody } from '../../../../UI/Card/Card';
import placeholderImg from '../../../../assets/mushroom.jpg';
import { AnchorTag, TitleLinks } from '../../../../UI/AnchorTag/AnchorTag';
import { Link } from 'react-router-dom';

const HomeCard = (props) => {
    const title = () => {
        if(props.speciesTitle){
            return props.speciesTitle
        }else{
            return "Fungi " + props.number
        }
    }

    const determinator = () => {
        if(props.determinator){
            return props.determinator
        }else{
            return 'Korisnik'
        }
    }

    // GET /api/v1/users/:id where id is id 
    const legator = () => {
        if(props.legator_id){
            return `Legator ID: ${props.legator_id}`
        }else{
            return 'Korisnik'
        }
    }

    const pathToObervation =`/observation/${props.id}`
    console.log(props.thumbImg)
    return(
        <Card width='23%'>
            <Link to={pathToObervation}>{props.thumbImg? <img src={`http://35.164.224.228${props.thumbImg}`}  alt="placeholderImg" style={{ width: '100%' }}/>: <img src={placeholderImg} alt="placeholderImg" style={{ width: '100%' }}/>}</Link>
            <CardBody >
                <TitleLinks to={pathToObervation} >
                    { title() } 
                </TitleLinks>
                <hr />
                <AnchorTag to={`/user/${props.legator_id}`}>
                    { legator() }
                </AnchorTag>
                <span className="text-muted text-small margin-top-tiny">
                    { props.addedAt }
                </span>
            </CardBody>
        </Card>
    )
}

export default HomeCard;