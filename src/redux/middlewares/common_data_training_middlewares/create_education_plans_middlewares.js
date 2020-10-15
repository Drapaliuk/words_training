import { createVariantList } from '../../../redux/actions/word_test_actions';
import { CREATE_EDUCATION_PLANS } from '../../action_types/index';
export const createEducationPlan = function(store) {
    return (next) => (action) => {
        // if(action.type === CREATE_EDUCATION_PLANS ) {
        //         const firstWord = action.serverPayload[0]
        //         store.dispatch(createVariantList(firstWord))
        //         return next(action)
        // }
        
        return next(action)
    }
}


