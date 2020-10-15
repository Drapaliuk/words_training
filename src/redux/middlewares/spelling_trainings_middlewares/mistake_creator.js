import { ADD_LETTER, HINT, SKIP_WORD } from '../../action_types/index';

export const mistakeCreator = function(store) {
    return (next) => (action) => {
        if(action.type === ADD_LETTER || action.type === HINT || action.type === SKIP_WORD) {
            const state = store.getState();
            console.log(action)
            return next(action)
        }
        return next(action)
    }
}