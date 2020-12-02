import React from 'react';
import { NavLink } from 'react-router-dom';
import {Header} from '../../../components/index'
import styles from './IntroductionPage.module.css';
import owl from '../../../assets/img/owl.jpg';
import { translatableText } from '../../../languages/instances/introduction';

export const Introduction = function(props) {
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