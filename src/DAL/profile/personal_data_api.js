import { instanceCreator } from '../configs';
const instance = instanceCreator('profile')

export const userPersonalDataAPI = {
    getPersonalData: (userId) => {
        let url = `personaldata?userid=${userId}`
        return instance.get(url)
    },
    
    postPersonalData: (userId, data) => {
        const requestBody = {userId, data}
        return instance.post('personaldata', requestBody)
    }
}




