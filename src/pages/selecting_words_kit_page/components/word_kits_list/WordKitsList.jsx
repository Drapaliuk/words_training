import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { commonDataSelectors } from '../../../../redux/selectors/common_data_selectors';
import { fetchingWordSetsNames, fetchingWords } from '../../../../redux/actions/common_data_actions'; //! все в одному редюсері

//! ВИБІР НАБОРУ СЛІВ МАЄ ВІДБУВАТИСЯ НЕ ПО ЙОГО БЕЗПОСРЕДНІЙ НАЗВІ, А ПО ID ШНИКУ

export const WordKitsList = function ({extraHandlers}) {
    const dispatch = useDispatch()
    React.useEffect(() => {
            dispatch(fetchingWordSetsNames()) 
    }, []);

    const wordKits = useSelector((state) => commonDataSelectors.getAllSetsNames(state));
    const onSelectingSetsName = (setName) => {
        dispatch(fetchingWords(setName))
    }
    


    return (
        <ul className = {styles['wordsets-list']}>
            {wordKits.map(wordKit => {
                return (
                    <li className = {styles['wordsets-list-item']}>
                        <NavLink className = {styles['wordsets-list-link']} 
                                to = {`/wordset/${wordKit.serviceInfo.name}`}
                                onClick = {() => onSelectingSetsName(wordKit.serviceInfo.name)}
                        >
                                    {wordKit.serviceInfo.name}
                        </NavLink>
                    </li>
                )
            })}
        </ul>
    )
}

