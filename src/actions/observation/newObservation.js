import fungi from '../../apis/fungi';

export const newObservation = (formValues, token) => async dispatch => {
    fungi.post("/observations", formValues, { 
        headers: { "AUTHORIZATION" : `Bearer ${token}`, 
                   "Accept" : 'application/json',
                   "Content-Type": 'application/json'}
        }
    ).then(response => {
        console.log(response)
    }).catch(error => {
        console.log(error)
    })
};