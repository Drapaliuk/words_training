import {SELECTING_FULL_KIT} from '../../action_types/index';
import { commonDataSelectors } from '../../selectors/index';
 
export const selectingFullKit = function(store) {
    return (next) => (action) => {

        if(action.type === SELECTING_FULL_KIT) {
            const state = store.getState()
            const selectedWords = commonDataSelectors.getSelectedWords(state)
            const initialisedWords = commonDataSelectors.getInitialisedWords(state)

            let payload = [];

            if(selectedWords.length === 0) {
                payload = [...initialisedWords]
            }

            if(selectedWords.length > 0) {
                const selectedWordsIds = selectedWords.map(el => el._id)
                payload = initialisedWords.filter(el => !selectedWordsIds.includes(el._id))
            }
            payload = [...selectedWords, ...payload]

            return next({...action, middlewarePayload: payload })
        }

        return next(action)
    }
}