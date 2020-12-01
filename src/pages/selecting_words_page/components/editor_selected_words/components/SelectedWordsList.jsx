import React from 'react';
import styles from '../styles.module.css';
import deleteImg from '../../../../../assets/img/delete.png';
import { useSelector } from 'react-redux';
import { profileSelectors } from '../../../../../redux/selectors';


export function SelectedWordsList({selectedWords, onDeleteSelectedWord}) {

    const selectedLanguage = useSelector(state => profileSelectors.getSelectedLanguage(state));

    return (
        <ul className = {styles['selected-words-list']}>
            { selectedWords.map(el => {
                return (
                            <li className = {styles['selected-words-item']}>
                                { el[selectedLanguage] }
                                <button className = {styles['delete-button']}
                                        onClick = {() => onDeleteSelectedWord(el._id)} 
                                >
                                    <img  src = {deleteImg} alt=""/>
                                </button> 
                            </li>
                        )
                }) 
            }
        </ul>
    )
}