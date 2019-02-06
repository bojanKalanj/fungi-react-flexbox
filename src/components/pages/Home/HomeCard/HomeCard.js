import React from 'react';

import { Card, CardBody } from '../../../../UI/Card/Card';
import placeholderImg from '../../../../assets/mushroom.jpg';
import { AnchorTag, TitleLinks } from '../../../../UI/AnchorTag/AnchorTag';

const HomeCard = () => {
    return(
        <Card width='23%'>
            <img src={placeholderImg} alt="placeholderImg" style={{ width: '100%' }}/>
            <CardBody >
                <TitleLinks to="/observation">
                    Vrsta Gljive Ovde 
                </TitleLinks>
                <hr />
                <AnchorTag to="/user">
                    Bojan Kalanj
                </AnchorTag>
                <p className="text-muted">
                    02.06.2018
                </p>
            </CardBody>
        </Card>
    )
}

export default HomeCard;