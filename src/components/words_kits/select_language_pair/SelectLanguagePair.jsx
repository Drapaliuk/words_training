import React from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';


export const SelectLanguagePair = function () {

    const [isVisibleLanguagePair, setVisibleLanguagePair] = React.useState(false)
    const [isVisibleFirstLanguageVariants, setVisibleFirstLanguageVariants] = React.useState(false);
    const [isVisibleSecondLanguageVariants, setVisibleSecondLanguageVariants] = React.useState(false);


    const onVisibleFirstLanguageVariants = () => setVisibleFirstLanguageVariants(!isVisibleFirstLanguageVariants)
    const onVisibleSecondLanguageVariants = () => setVisibleSecondLanguageVariants(!isVisibleSecondLanguageVariants)
    const onVisibleLanguagePair = () => setVisibleLanguagePair(!isVisibleLanguagePair)
    const onSelectFirstLanguage = () => {
        setVisibleFirstLanguageVariants(!isVisibleFirstLanguageVariants)
    }

    const onSelectSecondLanguage = () =>{
        setVisibleSecondLanguageVariants(!isVisibleSecondLanguageVariants)
    }

    return (
        <div className = {styles['select-language-pair']}>
           <button onClick = {onVisibleLanguagePair} className = {styles['select-language-pair__visible-btn']}>Мови для тренування</button>
           
           {
                isVisibleLanguagePair
                    &&
                <div className={styles["select-language-pair__variants-wrapper"]}>
                    <div className={styles["select-language-pair__language"]}>
                        <button onClick = {onVisibleFirstLanguageVariants} className = {styles['select-language-pair__selected-language']}>English</button>
                        
                        {
                            isVisibleFirstLanguageVariants
                              &&
                            <div className={styles["select-language-pair__variants-list"]}>
                              <button className = {styles['select-language-pair__variant']}>Ukrainian</button>
                              <button className = {styles['select-language-pair__variant']}>Russian</button>
                            </div>
                        }
                        
                        
                    </div>
                    <div className={styles["select-language-pair__language"]}>
                        <button onClick = {onVisibleSecondLanguageVariants} className = {styles['select-language-pair__selected-language']}>Ukrainian</button>
                        
                        {
                            isVisibleSecondLanguageVariants
                                &&
                            <div className={styles["select-language-pair__variants-list "]}>
                                <button className = {styles['select-language-pair__variant']}>English</button>
                                <button className = {styles['select-language-pair__variant']}>Russian</button>
                            </div>
                        }
                        
                       
                    </div>
                </div>
           }
           
        </div>
    )
}