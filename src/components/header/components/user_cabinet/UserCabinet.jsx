import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import styles from '../../Header.module.css';
import { logOut } from '../../../../redux/actions/authorization/authorization_action';


export function UserCabinet({onVisibleComponent}) {
    const dispatch = useDispatch();


    const onLogOut = function() {
        dispatch(logOut())
    }

    return (
        <div className = {styles['cabinet-short-info']}>
            <p>Ім'я:</p>
            <p>Рейтинг:</p>

            <button className = {styles['logout-button']} onClick = {onLogOut}> Вийти </button>
            <NavLink className = {styles['cabinet-more-link']} to = '/cabinet'>Більше...</NavLink>
        </div>
    )
}