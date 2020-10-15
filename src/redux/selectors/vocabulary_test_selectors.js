export const vocabularyTestSelectors = {
    getKnowledgeTest: state => state.educationPlans.vocabularyTestWords,
    getCurrentTaskWord: state => {
        const wordCounter = state.educationPlans.wordCounter
        const currentTaskWord = state.educationPlans.vocabularyTestWords[wordCounter]
        return currentTaskWord
    },
    getWordCounter: state => state.educationPlans.wordCounter,
}