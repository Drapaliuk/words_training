import React from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { fetchingKnowledgeTest } from '../../redux/actions/knowledge_test_actions';
import {Header} from '../../components/index'

import styles from './IntroductionPage.module.css';
import owl from '../../assets/img/owl.jpg'


export const IntroductionPage = function(props) {
    const dispatch = useDispatch()

    const onVocabularyTest = () => {
        console.log('1')
        dispatch(fetchingKnowledgeTest())
    }


    return (

        <div className={styles['main-container']}>
            <Header />
            <div className = {styles['introduction-page__inner-container']}>
                <div className = {styles['introduction-block']}>
                    <img className = {styles['introduction-image']} src = {owl} alt="logo img"/>
                    <NavLink onClick = {onVocabularyTest} className = {styles['default-button']} to = '/vocabularyTest'>Оцінити рівень знань</NavLink>
                    <button className = {styles['default-button']}>Спробувати тренування</button>
                </div>
            </div>
            
        </div>
    )
}