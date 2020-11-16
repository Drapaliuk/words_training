import { instanceCreator } from '../configs';
import axios from 'axios';
const instance = instanceCreator('knowledgetests')



export const knowledgeTestsAPI = {
    getVocabularyTest: () => instance.get('vocabularytest'),
    fetchVocabularyLevel: (testResult, authToken) => {
        const headers = {
            headers: {'Authorization': authToken}
        }
        return instance.post('vocabularytest', testResult, headers )
    }
}



// axios.post(Helper.getUserAPI(), {
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'JWT fefege...'
//     },
//     data
// })