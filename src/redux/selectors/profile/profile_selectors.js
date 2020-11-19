import { SELECT_LANGUAGE } from '../../action_types/index';

export const profileSelectors = {
    getSelectedLanguage: state => state.profile.selectedLanguage 
}
