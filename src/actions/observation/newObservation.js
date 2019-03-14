// import fungi from '../../apis/fungi';

// export const newObservationStart = () => {
//     return{
//         type: "NEW_OBSERVATION_START"
//     }
// }

// export const newObservationSuccess = (observation) => {
//     return{
//         type: "NEW_OBSERVATION_SUCCESS",
//         observation: observation
//     };
// };

// export const newObservationFail = (error) => {
//     return{
//         type: "NEW_OBSERVATION_FAIL",
//         error: error
//     };
// };

// export const newObservation = (formValues, token) => async dispatch => {
//     fungi.post("/observations", formValues, { 
//         headers: { "AUTHORIZATION" : `Bearer ${token}`, 
//                    "Accept" : 'application/json',
//                    "Content-Type": 'application/json'}
//         }
//     ).then(res => {
//         console.log(res);
//         console.log(res.data);
//         dispatch(newObservationSuccess(res.data));
//     }).catch(err => {
//         console.log(err);
//         dispatch(newObservationFail(err));
//     })
// };