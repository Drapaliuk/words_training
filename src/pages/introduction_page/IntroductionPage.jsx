import React from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { fetchingKnowledgeTest } from '../../redux/actions/knowledge_tests/knowledge_tests_actions';
import {Header} from '../../components/index'

import styles from './IntroductionPage.module.css';
import owl from '../../assets/img/owl.jpg';
import { translatableText } from './translatable_text';


export const IntroductionPage = function(props) {
    return (
        <div className={styles['main-container']}>
            <Header />
            <div className = {styles['introduction-page__inner-container']}>
                <div className = {styles['introduction-block']}>
                    <img className = {styles['introduction-image']} src = {owl} alt="logo img"/>
    <NavLink className = {styles['default-button']} to = '/vocabularyTest'> {translatableText('checkKnowladge')} </NavLink>
                    <button className = {styles['default-button']}> {translatableText('tryTraining')} </button>
                </div>
            </div>
            
        </div>
    )
}