import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import styles from '../../Header.module.css';
import { logOut } from '../../../../redux/actions/authorization/authorization_actions';
import { personalUserDataSelectors } from '../../../../redux/selectors/profile/personal_user_data/personal_user_data_selector';
import { clearUserPersonalData } from '../../../../redux/actions/profile/personal_user_data/personal_user_data_actions';
import { translatableText } from '../../translatable_text';
import { PROFILE_PART } from '../../../../languages/translations_parts/translations_parts';



export function UserCabinet({onVisibleComponent}) {
    const dispatch = useDispatch();
    const personalData = useSelector(state => personalUserDataSelectors.getFullPersonalUserData(state));

    const onLogOut = function() {
        console.log('log out!')
        dispatch(logOut())
        // dispatch(clearUserPersonalData())
    }

    return (
        <div className = {styles['cabinet-short-info']}>
            <p>{translatableText(null, [PROFILE_PART,'name'])}: {personalData.firstName}</p>

            <button className = {styles['logout-button']} onClick = {onLogOut}> {translatableText(null, [PROFILE_PART, 'exit'])} </button>
            <NavLink className = {styles['cabinet-more-link']} to = '/cabinet'>{translatableText(null, [PROFILE_PART, 'more'])}...</NavLink>
        </div>
    )
}