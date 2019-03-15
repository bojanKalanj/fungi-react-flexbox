import React from 'react';

import { Card, CardBody } from '../../../../UI/Card/Card';
import placeholderImg from '../../../../assets/mushroom.jpg';
import { AnchorTag, TitleLinks } from '../../../../UI/AnchorTag/AnchorTag';

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

    return(
        <Card width='23%'>
            <img src={placeholderImg} alt="placeholderImg" style={{ width: '100%' }}/>
            <CardBody >
                <TitleLinks to={pathToObervation} >
                    { title() } 
                </TitleLinks>
                <hr />
                <AnchorTag to="/user">
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