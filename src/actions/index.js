import fungi from '../apis/fungi';

export{
    auth,
    logout
} from './user/auth';

export const authCheckState = () => dispatch => {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');
};

export{
    fetchUser
} from './user/fetchUser';

export{
    register
} from './user/register';
// -----------------------------------------

export const newObservation = (formValues, token) => async dispatch => {
    fungi.post("/observations", formValues, { 
        headers: { "AUTHORIZATION" : `Bearer ${token}`, 
                   "Accept" : 'application/json',
                   "Content-Type": 'application/json'}
        }
    )
};

export{
    fetchObservation
} from './observation/fetchObservation';

export{
    fetchObservations
} from './observation/fetchObservations';
// -----------------------------------------

export{
    fetchSpecies
} from './species/fetchSpecies';

export{
    floralSpecies
} from './species/floralSpecies';
// -----------------------------------------

export{
    fetchHabitats
} from './habitat/fetchHabitats';
