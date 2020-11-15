import { CLEAR_SELECTED_WORDS_CURRENT_WORD_SET } from '../../action_types/index';

export const clearSelectedWordsCurrentWordset = function(store) {
    return (next) => (action) => {
        if(action.type === CLEAR_SELECTED_WORDS_CURRENT_WORD_SET) {
            const state  = store.getState();
            const selectedWords = state.trainingCommonData.selectedWords;
            const initialisedWordsIds = state.trainingCommonData.initialisedWords.reduce((acc, el, idx, arr) => {
                    acc.push(el._id)
                    return acc
            }, []);
            const middlewarePayload = [selectedWords.filter((el) => !initialisedWordsIds.includes(el._id))];

            return next({...action, middlewarePayload})
        }
        return next(action)
    }
}