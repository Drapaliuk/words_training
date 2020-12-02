import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { commonDataSelectors } from '../../../../../redux/selectors/training/common/common_data_selectors';
import { fetchingWordSetsNames, fetchingWords } from '../../../../../redux/actions/training/common/common_training_actions'; //! все в одному редюсері
import { profileSelectors } from '../../../../../redux/selectors';

export const WordKitsList = function ({extraHandlers}) {
    const dispatch = useDispatch()
    React.useEffect(() => {
            dispatch(fetchingWordSetsNames()) 
    }, []);

    const wordKits = useSelector((state) => commonDataSelectors.getAllSetsNames(state));
    const selectedLanguage = useSelector(state => profileSelectors.getSelectedLanguage(state));


    const onSelectingSetsName = (setName) => {
        dispatch(fetchingWords(setName))
    }
    


    return (
        <ul className = {styles['wordsets-list']}>
            {wordKits.map(wordKit => {
                return (
                    <li className = {styles['wordsets-list-item']}>
                        <NavLink className = {styles['wordsets-list-link']} 
                                to = {`/wordset/${wordKit._id}`}                          
                                onClick = {() => onSelectingSetsName(wordKit._id)}         
                        >
                                    {wordKit.serviceInfo.name[selectedLanguage]}
                        </NavLink>
                    </li>
                )
            })}
        </ul>
    )
}

