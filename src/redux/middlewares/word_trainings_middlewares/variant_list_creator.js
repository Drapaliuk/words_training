import { getRandomElement, mixingElement } from '../../../utils/mixers/mixers';

import { wordTestSelectors, commonDataSelectors } from '../../selectors/index'; //! зробити деструктуризацією
import { CREATE_VARIANT_LIST } from '../../action_types/index';
import { act } from 'react-dom/test-utils';

export function variantListCreator(store) { //rename
    return next => action => {
        const state = store.getState()

    if(action.type === CREATE_VARIANT_LIST) {
        const state = store.getState()
        const wordsForMixing = wordTestSelectors.getWordsForMixing(state)
        const currentWordCounter = commonDataSelectors.getCurrentWordCounter(state)
        
        const currentWord = commonDataSelectors.getCurrentWord(state)
       
        const getRandomWords =  getRandomElement(wordsForMixing, 3, currentWordCounter); // зробити щоб останній аргумент був ід а не порядковий номер
        const addedCurrentWord = [...getRandomWords, currentWord];
        const mixedVariantList = mixingElement(addedCurrentWord);

        return next({...action, payload: mixedVariantList})
    }

    return next(action)
    
    }
};