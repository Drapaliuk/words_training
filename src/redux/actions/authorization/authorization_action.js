import { SIGN_IN, LOGIN, LOG_OUT } from '../../action_types/index';
import { authAPI } from '../../../DAL/api';


export const logining = (authData) => {
    return (dispatch) => {
        authAPI.logining(authData)
               .then((response) => {
                   console.log(response)
                   const {data} = response
                if(data.responseCode === 1) {
                    dispatch({type: LOGIN, serverPayload: {userId: data.userId, isAuthorization: true}})
                    return
                }
            })
    }
}

export const logOut = () => ({type: LOG_OUT})

export const signIn = (authData) => {
    return (dispatch) => {
        authAPI.signIn(authData)
               .then((response) => {
                   console.log(response)
                   if(response.data.responseCode === 1) {
                       const isAuthorization = true
                       console.log('response.data', response.data)
                       dispatch({type: SIGN_IN, serverPayload: {userId: response.data.userId, isAuthorization: true}})
                       return
                   }
               })
    }
}
