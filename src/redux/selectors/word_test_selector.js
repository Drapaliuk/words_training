export const wordTestSelectors = {
    getAnswerWord: state => {
        const currentWord = state.trainingCommonData.scheduleTaskCard[state.trainingCommonData.currentWordCounter]; //! варто робити подібні селектори?
        if(currentWord) return currentWord[currentWord.answerLang]
        return null
    },

    getQuestionWord: state => {
        const currentWord = state.trainingCommonData.scheduleTaskCard[state.trainingCommonData.currentWordCounter];
        if(currentWord) return currentWord[currentWord.questionLang]
        return null
    },

    getQuestionLang: state => {
        const currentWord = state.trainingCommonData.scheduleTaskCard[state.trainingCommonData.currentWordCounter];
        if(currentWord) return currentWord.questionLang
        return null
    }, // перенести до загальнотренувального об'єкту селекторів

    getAnswerLang: state => {
        const currentWord = state.trainingCommonData.scheduleTaskCard[state.trainingCommonData.currentWordCounter];
        if(currentWord) return currentWord.answerLang
        return null
    },

    getTrainingId: state => state.trainingCommonData.wordTestState.trainingId,
    getWordsForMixing: state => state.trainingCommonData.wordTestState.wordsForMixing,
    getCurrentWordMistakes: state => state.trainingCommonData.wordTestState.currentWordMistakes,
    getMistakesOfTest: state => state.trainingCommonData.wordTestState.mistakesOfTest,
    getVariantList: state => state.trainingCommonData.wordTestState.variantList, 
    isLastTask: state => state.trainingCommonData.wordTestState.isLastTask,
    isTrueAnswer: state => state.trainingCommonData.wordTestState.isTrueAnswer,
    isMixedWords: state => state.trainingCommonData.wordTestState.isMixedWords,
    needHint: state => state.trainingCommonData.wordTestState.needHint,
    getCurrentTask: state => {
        const currentTaskCounter = state.trainingCommonData.currentWordCounter;
        console.log(currentTaskCounter)
        return state.trainingCommonData.wordTestState.variantList[currentTaskCounter]
    }
}