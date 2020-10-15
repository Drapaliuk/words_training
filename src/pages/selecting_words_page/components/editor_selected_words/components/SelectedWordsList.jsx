import React from 'react';
import styles from '../styles.module.css';
import deleteImg from '../../../../../assets/img/delete.png';


export function SelectedWordsList({selectedWords, onDeleteSelectedWord}) {
    return (
        <ul className = {styles['selected-words-list']}>
            { selectedWords.map(el => {
                return (
                            <li className = {styles['selected-words-item']}>
                                {el.ua}
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