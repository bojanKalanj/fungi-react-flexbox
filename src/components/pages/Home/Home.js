import React from 'react';
import { Card, CardBody } from '../../../UI/Card/Card';
import { FlexContainer } from '../../../UI/Container/Container';
import placeholderImg from '../../../assets/mushroom.jpg';
import { AnchorTag, TitleLinks } from '../../../UI/AnchorTag/AnchorTag';

const Home = () => {
    return (
        <FlexContainer>
            <Card width='30%'>
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
            <Card width='30%'>
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
            <Card width='30%'>
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
            <Card width='30%'>
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
            <Card width='30%'>
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
            <Card width='30%'>
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
        </FlexContainer>
    )
}

export default Home;



