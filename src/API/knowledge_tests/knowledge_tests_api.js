import { instanceCreator } from '../configs';
import axios from 'axios';
const instance = instanceCreator('knowledgetests')



export const knowledgeTestsAPI = {
    fetchKnowledgeTest: () => instance.get('vocabularytest'),
    fetchVocabularyLevel: (testResult, authToken) => {
        const headers = {
            headers: {'Authorization': authToken}
        }
        return instance.post('vocabularytest', testResult, headers )
    }
}