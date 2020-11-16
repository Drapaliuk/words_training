import { getIds } from '../../../utils/index';

export const vocabularyTestSelectors = {
    getKnowledgeTest: state => state.educationPlans.vocabularyTestWords,
    getCurrentTaskWord: state => {
        const isLastTask = state.educationPlans.isLastTask
        if(isLastTask) return null
        const wordCounter = state.educationPlans.wordCounter
        const currentTaskWord = state.educationPlans.vocabularyTestWords[wordCounter]
        return currentTaskWord.eng
    },
    getWordCounter: state => state.educationPlans.wordCounter,
    isLastTask: state => state.educationPlans.isLastTask,
    getTestAnswers: state => state.educationPlans.answers,
    getModifiedTestAnswers: state => {
        return state.educationPlans.answers.map(el => {
            // console.log({answer: el.answer, word: el.word._id})
            return {answer: el.answer, word: el.word._id}
        })
    }

}