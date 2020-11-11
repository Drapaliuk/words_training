import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import styles from '../../Header.module.css';
import { logOut } from '../../../../redux/actions/authorization/authorization_action';
import { personalUserDataSelectors } from '../../../../redux/selectors/personal_user_data/personal_user_data_selector';
import { clearUserPersonalData } from '../../../../redux/actions/personal_user_data/personal_user_data_actions';
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
            <p>Ім'я: {personalData.firstName}</p>
            <p>Рейтинг:</p>

            <button className = {styles['logout-button']} onClick = {onLogOut}> Вийти </button>
            <NavLink className = {styles['cabinet-more-link']} to = '/cabinet'>Більше...</NavLink>
        </div>
    )
}