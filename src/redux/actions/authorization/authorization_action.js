import { SIGN_IN, LOGIN, LOG_OUT, IS_AUTHORIZATION } from '../../action_types/index';
import { authAPI } from '../../../DAL/api';
import { localStorageManipulator } from '../../../utils/index';

export const logOut = () => ({type: LOG_OUT})

export const logining = authData => dispatch => {
    authAPI.logining(authData)
            .then((response) => {
            console.log('LOG iN', response)
            const {data} = response
            if(data.responseCode === 1) {
                const { userId, token, refreshToken } = data;
                localStorageManipulator.saveAuthToken(token)
                localStorageManipulator.saveRefreshToken(refreshToken)
                return dispatch({type: LOGIN, serverPayload: {userId, token, refreshToken, isAuthorization: true}})
            }
        })
};


export const signIn = authData => {
    return (dispatch) => {
        authAPI.signIn(authData)
               .then(response => {
                   console.log('SIGN iN', response);
                   if(response.data.responseCode === 1) {
                       const { userId, token, refreshToken } = response.data
                       localStorageManipulator.saveAuthToken(token)
                       localStorageManipulator.saveRefreshToken(refreshToken)
                       localStorage.setItem('auth_token', token)
                       dispatch({type: SIGN_IN, serverPayload: {token, refreshToken, userId, isAuthorization: true}})
                       return
                   }
               })
    }
};


export const checkAuthorization = () => (dispatch) => {
    const authToken = localStorageManipulator.getAuthToken();
    if(!authToken) return dispatch({type: IS_AUTHORIZATION, isAuthorization: false})
    
    authAPI.isAuthorization(authToken)
           .then(({data}) => {
               console.log('data', data)
                if(data.responseCode === 1) {
                    dispatch({type: IS_AUTHORIZATION, isAuthorization: true});
                }
                // if(response)
           })
}
