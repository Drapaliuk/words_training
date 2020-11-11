import { SIGN_IN, LOGIN, LOG_OUT, IS_AUTHORIZATION } from '../../action_types/index';
import { authAPI } from '../../../DAL/api';
import { localStorageManipulator } from '../../../utils/index';

export const logOut = () => dispatch => {
    console.log('log out thunk ')
    const refreshToken = localStorageManipulator.getRefreshToken();
    authAPI.logOut(refreshToken)
           .then(({data}) => {
               console.log('logout data', data)
               if(data.responseCode === 1) {
                    localStorageManipulator.deleteAuthToken();
                    localStorageManipulator.deleteRefreshToken();
                    return dispatch({type: LOG_OUT})
               }
           }) 
}

export const logining = authData => dispatch => {
    authAPI.logining(authData)
           .then((response) => {
           const {data} = response
           if(data.responseCode === 1) {
               const { userId, token, refreshToken } = data;
               localStorageManipulator.saveAuthToken(token)
               localStorageManipulator.saveRefreshToken(refreshToken)
               return dispatch({type: LOGIN, serverPayload: {userId, token, refreshToken, isAuthorization: true}})
           }
        })
};


export const signIn = (signInData, hasAlreadyUseHandler) => dispatch => {
    authAPI.signIn(signInData)
           .then(({data}) => {
               if(data.responseCode === 1) {
                   const { userId, token, refreshToken } = data
                   localStorageManipulator.saveAuthToken(token)
                   localStorageManipulator.saveRefreshToken(refreshToken)
                   localStorage.setItem('auth_token', token)
                   dispatch({type: SIGN_IN, serverPayload: {token, refreshToken, userId, isAuthorization: true}})
                   return
               }
            //    if(data.responseCode === 0) {
            //         hasAlreadyUseHandler()
            //    }
           })
};


export const checkAuthorization = () => (dispatch) => {
    const authToken = localStorageManipulator.getAuthToken();
    console.log(authToken)
    if(!authToken) {
        console.log('asdasdasadasdadsadasdasdas')
        return dispatch({type: IS_AUTHORIZATION, isAuthorization: false})
    }
    authAPI.checkAuthorization(authToken)
           .then(({data}) => {
               console.log('data', data)
                if(data.responseCode === 1) {
                    dispatch({type: IS_AUTHORIZATION, isAuthorization: true});
                }

                if(data.responseCode === 0) {
                    const refreshToken = localStorageManipulator.getRefreshToken()
                    authAPI.refreshAuthToken(refreshToken)
                           .then(resp => {
                               const { userId, token, refreshToken } = resp.data;
                                localStorageManipulator.saveAuthToken(token)
                                localStorageManipulator.saveRefreshToken(refreshToken)
                                return dispatch({type: LOGIN, serverPayload: {userId, token, refreshToken, isAuthorization: true}})

                           })
                }
           })
}

export const resetSigninForm = () => {}
// export const loginHasAlreadyUse = () => ({type: USER_HAS_ALREADY_USE})
