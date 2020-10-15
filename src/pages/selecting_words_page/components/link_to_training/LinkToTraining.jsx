import React from 'react';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';

export const LinkToTraining = function ({url, text}) {
    return (
            <NavLink className = {styles['training-button']} to  = {url}>
                {text}
            </NavLink>
    )
}