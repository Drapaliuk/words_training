import { SIGN_IN, LOGIN, LOG_OUT } from '../../action_types/index';
import { authAPI } from '../../../DAL/api';


export const logining = (authData) => {
    return (dispatch) => {
        authAPI.logining(authData)
               .then(({data}) => {
                if(data.responseCode === 1) {
                    dispatch({type: LOGIN, serverPayload: true})
                    return
                }
            })
    }
}

export const logOut = () => ({type: LOG_OUT})

export const signIn = (authData) => {
    return (dispatch) => {
        console.log('got it')
        authAPI.signIn(authData)
               .then(({data}) => {
                   console.log('data sign in', data)
                   if(data.responseCode === 1) {
                       const isAuthorization = true
                       dispatch({type: SIGN_IN, serverPayload: isAuthorization})
                       return
                   }
               })
    }
}
