import React from 'react';
import { FlexContainer } from '../../../UI/Container/Container';
import { Card, CardBody } from '../../../UI/Card/Card';

import HomeCard from './HomeCard/HomeCard';

const Home = () => {
    return (
        <FlexContainer>
            <Card width="23%">
                <CardBody>
                    
                </CardBody>
            </Card>
            <div style={{ width: '75%' }}>
                <FlexContainer>
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                </FlexContainer>
            </div>
        </FlexContainer>
    )
}

export default Home;



