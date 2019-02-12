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

    return(
        <Card width='23%'>
            <img src={placeholderImg} alt="placeholderImg" style={{ width: '100%' }}/>
            <CardBody >
                <TitleLinks to="/observation/" params={props.id} >
                    { title() } 
                </TitleLinks>
                <hr />
                <AnchorTag to="/user">
                    { determinator() }
                </AnchorTag>
                <p className="text-muted">
                    { props.addedAt }
                </p>
            </CardBody>
        </Card>
    )
}

export default HomeCard;