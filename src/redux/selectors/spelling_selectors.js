export const spellingSelectors = {
    getTrainingId: state => state.trainingCommonData.spellingState.trainingId, //?!
    
    getSplittedAnswerWord: state => state.trainingCommonData.spellingState.splittedAnswerWord,

    getPressedKey: state => state.trainingCommonData.spellingState.pressedKey,
    getCurrentWord: state => state.trainingCommonData.currentWordCounter,
    isMistake: state => state.trainingCommonData.spellingState.isMistake,
    getMistakeService: state => state.trainingCommonData.spellingState.mistakeService,
    getHintLetter: state => state.trainingCommonData.spellingState.hintLetter,
    getNeedHint: state => state.trainingCommonData.spellingState.needHint,
    isLastTask: state => state.trainingCommonData.spellingState.isLastTask,
    getLetterCounter: state => state.trainingCommonData.spellingState.letterCounter,
    isLastLetter: state => state.trainingCommonData.spellingState.isLastLetter,
    isFinishTask: state => state.trainingCommonData.spellingState.isFinishTask,

    
}
