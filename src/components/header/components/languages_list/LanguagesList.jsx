import React from 'react'
import { useDispatch } from 'react-redux';
import styles from './styles.module.css';
import { selectingPageLanguage } from '../../../../redux/actions/personal_user_data/personal_user_data_actions';




export function LanguagesList({onVisibleComponent}) {
    const dispatch = useDispatch();
    const onSelectingLanguage = (event) => {
        const selectedLanguage = event.nativeEvent.target.childNodes[0].textContent;

        dispatch(selectingPageLanguage(selectedLanguage));
        onVisibleComponent('LanguagesList')();

    }

    return (
        <div className = {styles['language-list']}
             onClick = {onSelectingLanguage}
        >
            <button className = {styles['list-item']}>ukr</button>
            <button className = {styles['list-item']}>eng</button>
            <button className = {styles['list-item']}>rus</button>
        </div>
    )
}
