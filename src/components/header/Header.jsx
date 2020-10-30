import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import owlIcon from '../../assets/img/owl-icon.png';
import languageIcon from '../../assets/img/translation.png';
import vocabularyIcon from '../../assets/img/vocabulary.png';
import { authorizationSelectors } from '../../redux/selectors/index';
import { useSelector } from 'react-redux';

import { TrainingModesList, LanguagesList, UserCabinet, WordKitsList } from './components/index';


export const Header = function() {
    const [isVisibleWordSetsList, setVisibleWordSetsList] = React.useState(false);
    const [isVisibleLanguageList, setVisibleLanguageList] = React.useState(false);
    const [isVisibleUserCabinet, setVisibleUserCabinet] = React.useState(false);
    const [isVisibleTrainingsList, setVisibleTrainingsList] = React.useState(false);
    const isAuthorization = useSelector(state => authorizationSelectors.isAuthorization(state));
    const selectedAppLanguage = useSelector(state => state.personalUserData.selectedLanguage)


    const handlers = {
        'UserCabinet': [isVisibleUserCabinet, setVisibleUserCabinet],
        'WordKitsList': [isVisibleWordSetsList, setVisibleWordSetsList],
        'TrainingModesList': [isVisibleTrainingsList, setVisibleTrainingsList],
        'LanguagesList': [isVisibleLanguageList, setVisibleLanguageList],
    }
    
    const onVisibleComponent = (currentComponent) => () => {
        if(!currentComponent) return
        for( let key in handlers ) {
            if(key === currentComponent) {
                handlers[currentComponent][1](!handlers[currentComponent][0])
                continue
            }

            handlers[key][1]((false))
        }

    }



    return (
        <div className = {styles['main-container']}>
            <header className = {styles.header}>
                <NavLink to = {'/'} className = {styles['app-logo']}>
                    <img className = {styles['logo-img']} src = {owlIcon} alt=""/>
                </NavLink>

                <div className = {styles['education-block']}>
                    <div className = {styles['training-block']}>
                        <button  className = { styles['education-block-button']}
                                 onClick = {onVisibleComponent('TrainingModesList')}
                            > Режими тренувань </button>
                        {
                            isVisibleTrainingsList
                                                    ?
                                                    <div className = { styles['training-list-wrapper'] }>
                                                        <TrainingModesList onVisibleComponent = {onVisibleComponent} />
                                                    </div>
                                                    :
                                                    null
                        }
                    </div>
                    
                    <div className = {styles['wordsets-block']}>
                        <button onClick = {onVisibleComponent('WordKitsList')}
                                className = {styles['education-block-button']}
                        >
                             Набори слів 
                        </button>
                        
                        {
                            isVisibleWordSetsList
                                                    ?
                                                    <div className = {styles['wordsets-list-wrapper']}>
                                                        <WordKitsList onVisibleComponent = {onVisibleComponent} />
                                                    </div>
                                                    :
                                                    null
                        }
                    </div>
                </div>


                <NavLink to = '/pausedTrainings'>Призупинені тренування</NavLink>
                
                <div className = {styles['header-service-block']}>
                    {
                        isAuthorization
                                        ?
                                        <NavLink to = {'/userVocabulary'}>
                                            <img src = {vocabularyIcon} alt=""/>
                                        </NavLink>
                                        :
                                        null
                    }
                    

                <div className = {styles['language-selector-wrapper']}>
                    <button className = {styles['language-button']}
                            onClick =  {onVisibleComponent('LanguagesList')}
                    >
                        <img src = { languageIcon } alt=""/>
                        <span className = {styles['selected-language']}>{ selectedAppLanguage }</span> 
                    </button>
                    {
                        isVisibleLanguageList
                                                ?
                                                <LanguagesList onVisibleComponent = {onVisibleComponent} />
                                                :
                                                null
                    }
                </div>

                    {
                        isAuthorization
                                        ?
                                        null
                                        :
                                        <NavLink className = {styles['login-button']} to = {'/signin'}> Зареєструватись </NavLink>

                    }
                    
                    
                    {
                        isAuthorization 
                                        ?
                                        <div className = {styles['user-cabinet-wrapper']}>
                                            <button onClick = {onVisibleComponent('UserCabinet')}
                                                    className = {styles['cabinet-icon-button']}
                                                >
                                                    Кабінет</button>
                                            {
                                                isVisibleUserCabinet
                                                                    ?
                                                                    <UserCabinet onVisibleComponent = {onVisibleComponent} />
                                                                    :
                                                                    null
                                            }
                                        </div>
                                        :
                                    <NavLink className = {styles['login-button']} to = {'/login'}> Увійти </NavLink>
                    }
                    

                </div>
            </header>
        </div>
    )
}