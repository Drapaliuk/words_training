import { SAVE_USER_PERSONAL_DATA } from '../../action_types/index';
import { personalUserDataSelectors } from '../../selectors/personal_user_data/personal_user_data_selector';

export const personalUserData = (store) => (next) => (action) => {
    if(action.type === SAVE_USER_PERSONAL_DATA) {
        const state = store.getState();
        const newPersonalData =  personalUserDataSelectors.getTemporaryPersonalUserData(state)
        return next({...action, middlewarePayload: newPersonalData})
    }
    return next(action)
}