export const commonDataSelectors = {
    getSelectedWords: state => state.trainingCommonData.selectedWords,
    getCurrentWordCounter: state => state.trainingCommonData.currentWordCounter,
    getScheduleTaskCard: state => state.trainingCommonData.scheduleTaskCard,
    getCurrentWord: state => state.trainingCommonData.scheduleTaskCard[state.trainingCommonData.currentWordCounter],
    getQuestionLanguage: state => {
        const currentWord = state.trainingCommonData.scheduleTaskCard[state.trainingCommonData.currentWordCounter];
        if(currentWord) return state.trainingCommonData.scheduleTaskCard[state.trainingCommonData.currentWordCounter].questionLang
        return null

    },
    getInitialisedWords: state => state.trainingCommonData.initialisedWords, 
    isLastTask: state => state.trainingCommonData.isLastTask,
    getTranslatingLanguages: state => { //!?
        return state.trainingCommonData.testWordsLanguage
    },
    getCurrentTrainingModeId: state => state.trainingCommonData.currentTrainingModeId,
    getCurrentTaskStatistics: (state, trainingId) => { //не розумію цей селектор
        switch (trainingId) {
            case '001':
                return { ...state.trainingCommonData.wordTestState.currentTaskStatistics }
            case '002':
                return { ...state.trainingCommonData.spellingState.currentTaskStatistics }
            default:
                return {}
        }
    },
    getAllSetsNames: state => state.trainingCommonData.allSetsNames, //! rename!!!
    getTrainingStatistics: state => state.trainingCommonData.trainingStatistics,
    isFinishedTraining: state => state.trainingCommonData.isFinishedTraining,
    getSelectedTrainingModeId: state => state.trainingCommonData.selectedTrainingModeId,
    getTrainingModesInfo: state => state.trainingCommonData.allTrainingsIds,
    isLoaded: state => state.trainingCommonData.isLoaded,
    getScheduleTaskTrainingId: state => {
        const currentWord = state.trainingCommonData.scheduleTaskCard[state.trainingCommonData.currentWordCounter]
        if(currentWord) return currentWord.trainingId
        return null
    }
}



