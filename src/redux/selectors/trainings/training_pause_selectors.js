export const getInfoForPause = state => {
    const trainingStatePart = state.trainingCommonData;

    const trainingCommonData = {
        currentTaskCounter: trainingStatePart.currentWordCounter,
        scheduleTaskCards: trainingStatePart.scheduleTaskCard,
        trainingStatistics: trainingStatePart.trainingStatistics,
    }

    const selectedTrainingModeId = trainingStatePart.selectedTrainingModeId;

    if(selectedTrainingModeId === '001') {
        const wordTestStatePart = {
            task: trainingStatePart.wordTestState.variantList,
            currentTaskStatistics: trainingStatePart.wordTestState.currentTaskStatistics
        }

        return { trainingCommonData, wordTestStatePart }
    }

    if(selectedTrainingModeId === '002') {
        const spellingTraining = {
            tasks: trainingStatePart.spellingState.tasks,
            task: trainingStatePart.spellingState.splittedAnswerWord,
            currentLetter: trainingStatePart.spellingState.letterCounter,
            currentTaskStatistics: trainingStatePart.spellingState.currentTaskStatistics
        }

        return {trainingCommonData, spellingTraining }
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
            wordTestState
        }

        return mixedTraining
    }
}

export const getPausedTrainingsList = state => state.pausedTrainings.pausedTrainingList

                