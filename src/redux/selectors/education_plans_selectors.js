import { createSelector } from 'reselect';
import { spellingSelectors, wordTestSelectors } from './index';

let reselectDependencies = [spellingSelectors.getTrainingId, wordTestSelectors.getTrainingId]

export const educationPlansSelectors = {
    getAllTrainingTypes: createSelector(reselectDependencies, (...rest) => {
        return rest
    }),
    getEducationPlan: state => state.educationPlans.educationPlan,
}


