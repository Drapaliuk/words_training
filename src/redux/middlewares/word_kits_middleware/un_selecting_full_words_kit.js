import {UNSELECTING_FULL_KIT} from '../../action_types/index';
import { commonDataSelectors } from '../../selectors/index';


export const unSelectingFullWordsKit = function(store) {
    return (next) => (action) => {
        if(action.type === UNSELECTING_FULL_KIT) {
            const state = store.getState();
            const selectedWords = commonDataSelectors.getSelectedWords(state);
            const initialisedWords = commonDataSelectors.getInitialisedWords(state);
            const selectedWordsCopy = [...selectedWords];

            const selectedWordsCurrentWordKit = selectedWords.reduce((acc, el, idx, arr) => {
                const currentWordsKit = initialisedWords.filter(word => word._id === el._id)
                acc = [...acc, ...currentWordsKit]
                return acc
            }, [])

            selectedWordsCurrentWordKit.forEach(el => {
                selectedWordsCopy.forEach((word, idx) => {
                    if(word._id === el._id) {
                        selectedWordsCopy.splice(idx, 1)
                    }
                });
            })
            return next({...action, middlewarePayload: selectedWordsCopy})
        }
        return next(action)
    }
}