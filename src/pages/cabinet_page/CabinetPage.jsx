import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/header/Header';
import { fetchingUserPersonalData } from '../../redux/actions/personal_user_data/personal_user_data_actions';
import { personalUserDataSelectors } from '../../redux/selectors/personal_user_data/personal_user_data_selector';
import { FormForChangePersonalData } from './componetnts/index';
import { changePersonaUserData, saveNewPersonalUserData, cancelEditPersonalData } from '../../redux/actions/personal_user_data/personal_user_data_actions';
import { authorizationSelectors } from '../../redux/selectors/authorization_selectors';
import styles from './CabinetPage.module.css'; 
import edit from '../../assets/img/edit_cabinet.png';
import arrowDown from '../../assets/img/arrow-down.png';
import arrowUp from '../../assets/img/arrow_up.png';

export const CabinetPage = function() {
    const dispatch = useDispatch()
    const userId = useSelector(state => authorizationSelectors.getUserId(state))
    React.useEffect(() => {
         dispatch(fetchingUserPersonalData(userId))
    }, [])
    const [isVisiblePersonalData, setVisiblePersonalData] = React.useState(false);
    const [isEditPersonalData, setEditPersonalData] = React.useState(false);

    const personalData = useSelector(state => {
        return personalUserDataSelectors.getFullPersonalUserData(state)
    })

    const temporaryPersonalData = useSelector(state => {
        return personalUserDataSelectors.getTemporaryPersonalUserData(state)
    })

    const onChangePersonalUserData = (data) => {
        dispatch(changePersonaUserData(data))
    }

    const onSaveNewPersonalUserData = () => {
        dispatch(saveNewPersonalUserData(userId, temporaryPersonalData))
        setEditPersonalData(false)
    }

    const onVisiblePersonalData = () => {
        setVisiblePersonalData(!isVisiblePersonalData)
        setEditPersonalData(false)
    } 

    const onCancelEditPersonalData = () => {
        dispatch(cancelEditPersonalData())
        setEditPersonalData(false)
    }

    return ( 
        <div>
            <Header />
            <div className = {styles['common-wrapper']}>
                <div className = {styles['section-wrapper']}>
                    <div className = {styles['section-title']} onClick = { onVisiblePersonalData }>
                        <span>Особисті дані</span> 
                        <img src={isVisiblePersonalData ? arrowUp : arrowDown} alt=""/>
                    </div>
                    {
                        isVisiblePersonalData 
                        ?
                        <div className = {styles['section-content']}>
                            {
                                isVisiblePersonalData && !isEditPersonalData
                                ?
                                    <div className = {styles['items-wrapper']}>
                                        <button className = {styles['edit-button']}
                                                onClick = {() => setEditPersonalData(!isEditPersonalData)}
                                                >
                                            <img src={edit} alt=""/>
                                        </button>
                                        <p className = {styles['items']}>Ім'я: {personalData.lastName}</p>
                                        <p className = {styles['items']}>Прізвище: {personalData.firstName}</p>
                                    </div>
                                :
                                null
                            }

                            {
                                isVisiblePersonalData && isEditPersonalData
                                ?
                                <FormForChangePersonalData onSave = {onSaveNewPersonalUserData}
                                                            temporaryPersonalData = {temporaryPersonalData}
                                                            onChange = {onChangePersonalUserData}
                                                            onCancelEdit = { onCancelEditPersonalData }
                                                        />
                                :
                                null
                            }
                        </div>
                        :
                        null
                    }
                    
                </div>
            </div>
            

            
        </div>
    )
} 

