export const getInfoForPause = state => {
    const trainingStatePart = state.trainingCommonData;

    const trainingCommonData = {
        currentTaskCounter: trainingStatePart.currentWordCounter,
        scheduleTaskCards: trainingStatePart.scheduleTaskCard,
        trainingStatistics: trainingStatePart.trainingStatistics,
        currentTrainingModeId: trainingStatePart.currentTrainingModeId
    }

    const selectedTrainingModeId = trainingStatePart.selectedTrainingModeId;
    const serviceInfo = {
        timestamp: Date.now(new Date()),
        comment: state.pausedTrainings.comment,
        selectedTrainingModeId: state.trainingCommonData.selectedTrainingModeId
    }

    if(selectedTrainingModeId === '001') {
        const wordTestState = {
            task: trainingStatePart.wordTestState.variantList,
            currentTaskStatistics: trainingStatePart.wordTestState.currentTaskStatistics
        }

        const objectForPost = {
            data: {trainingCommonData, wordTestState},
            serviceInfo
        }

        return objectForPost
    }

    if(selectedTrainingModeId === '002') {
        const spellingTraining = {
            tasks: trainingStatePart.spellingState.tasks,
            task: trainingStatePart.spellingState.splittedAnswerWord,
            currentLetter: trainingStatePart.spellingState.letterCounter,
            currentTaskStatistics: trainingStatePart.spellingState.currentTaskStatistics
        }

        const objectForPost = {
            data: {trainingCommonData, spellingTraining},
            serviceInfo
        }

        return objectForPost
    }
    if(selectedTrainingModeId === '003') {
        const wordTestState = {
            task: trainingStatePart.wordTestState.variantList,
            currentTaskStatistics: trainingStatePart.wordTestState.currentTaskStatistics
        }

        const spellingTraining = {
            tasks: trainingStatePart.spellingState.tasks,
            task: trainingStatePart.spellingState.splittedAnswerWord,
            currentLetter: trainingStatePart.spellingState.letterCounter,
            currentTaskStatistics: trainingStatePart.spellingState.currentTaskStatistics
        }
        const mixedTraining = {
            trainingCommonData,
            spellingTraining,
            wordTestState,
        }

        const objectForPost = {
            data: mixedTraining,
            serviceInfo
        }

        return objectForPost
    }
}

export const getPausedTrainingsList = state => state.pausedTrainings.pausedTrainingList
export const getPausedTrainingComment = state => state.pausedTrainings.comment
export const pausedTrainingSelectors = {
    isOpenCommentField: state => state.pausedTrainings.isOpenCommentField,
    isOpenExitWindow: state => state.pausedTrainings.isOpenExitWindow,
    // getSelectedTrainingForСontinue: state => state.pausedTrainingList
}

                