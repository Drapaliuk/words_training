import { instanceCreator }  from '../configs';
const instance = instanceCreator('auth', {validateStatus: status => status >= 200 && status < 500})

export const authAPI = {
    logining: loginData => {
        return instance.post('login', loginData)
    },

    signIn: signInData => {
        return instance.post('signin', signInData)
    },

    checkAuthorization: authToken => {
        return instance.get('isAuthorization', {headers: {Authorization: authToken}})
    },

    refreshAuthToken: refreshToken => {
        const requestBody = {refreshToken}
        return instance.post('refreshToken', requestBody)
    },

    logOut: refreshToken => {
        const requestBody = {refreshToken}
        return instance.post('logout', requestBody)
    }
}
