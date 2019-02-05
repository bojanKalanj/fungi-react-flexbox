import React from 'react';

import Form from '../../../UI/Form/Form';
import Input from '../../../UI/Form/Input/Input';
import  Button from '../../../UI/Button/Button';

const Login = () => {
    return (
        <Form title="Prijavite se">
            <Input label="Ime" placeholder="Vase ime"/>
            <Input label="Email" placeholder="Vas email"/>
            <Button>
                Prijavi se
            </Button>
        </Form>
    )
}

export default Login;



