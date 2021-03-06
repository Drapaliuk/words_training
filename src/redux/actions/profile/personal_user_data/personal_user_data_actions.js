import { SELECTING_APPLICATION_LANGUAGE } from '../../../action_types/index';
import { userPersonalDataAPI } from '../../../../API/profile/personal_data_api';

import { FETCHING_PERSONAL_DATA, CHANGE_USER_PERSONAL_DATA,
         SAVE_USER_PERSONAL_DATA, CLEAR_USER_PERSONAL_DATA,
         CANCEL_EDIT_PERSONAL_DATA  } from '../../../../redux/action_types/index';
         
export const changePersonaUserData = (payload) => ({ type: CHANGE_USER_PERSONAL_DATA, payload });
export const clearUserPersonalData = () => ({type: CLEAR_USER_PERSONAL_DATA});
export const cancelEditPersonalData = () => ({type: CANCEL_EDIT_PERSONAL_DATA});

export const selectingPageLanguage = selectedLanguage => {
    return { type: SELECTING_APPLICATION_LANGUAGE, payload: selectedLanguage }
};

export const fetchingUserPersonalData = (userId) => (dispatch) => {
    userPersonalDataAPI.fetchPersonalData(userId).then(({data, err}) => {
        if(err) throw err;
        if(data.responseCode === 1) {
            dispatch({type: FETCHING_PERSONAL_DATA, serverPayload: data.personalData})
        }
    });
};

export const saveNewPersonalUserData = (userId, userData) => (dispatch) => {
    userPersonalDataAPI.postPersonalData(userId, userData).then((response, err) => {
        if(err) throw err;
        if(response.data.responseCode === 1) {
            dispatch({type: SAVE_USER_PERSONAL_DATA})
        }
    })
};