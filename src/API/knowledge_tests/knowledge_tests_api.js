import { instanceCreator } from '../configs';
const instance = instanceCreator('knowledgetests')

export const knowledgeTestsAPI = {
    getVocabularyTest: () => instance.get('vocabularytest')
    // postTestResult: () => instance.post()
}