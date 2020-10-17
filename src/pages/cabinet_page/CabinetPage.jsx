import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/header/Header';
import { fetchingUserPersonalData } from '../../redux/actions/personal_user_data/personal_user_data_actions';
import { personalUserDataSelectors } from '../../redux/selectors/personal_user_data/personal_user_data_selector';
import { FormForChangePersonalData } from './componetnts/index';
import { changePersonaUserData, saveNewPersonalUserData } from '../../redux/actions/personal_user_data/personal_user_data_actions';
import { authorizationSelectors } from '../../redux/selectors/authorization_selectors';
import { styles } from './CabinetPage.module.css' 

export const CabinetPage = function() {
    const dispatch = useDispatch()
    const userId = useSelector(state => authorizationSelectors.getUserId(state))
    React.useEffect(() => {
         dispatch(fetchingUserPersonalData(userId))
    }, [])


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
    }

    const [isVisibleChangeForm, setVisibleChangeForm] = React.useState(false);
    const [isVisiblePersonalData, setVisiblePersonalData] = React.useState(false);

    return ( 
        <div className = {styles.wrapper}>
            <Header />
            <div className = {styles['personal-data-wrapper']}>
                <div>Особисті дані</div>
                <button onClick = {() => setVisiblePersonalData(!isVisiblePersonalData)}>...</button>
                {
                    isVisiblePersonalData
                    ?
                    <div>
                        <div>
                            <p>{personalData.lastName}</p>
                            <p>{personalData.firstName}</p>
                        </div>
                    </div>
                    :
                    null
                }
            </div>

            <FormForChangePersonalData onSaveNewPersonalUserData = {onSaveNewPersonalUserData}
                                    temporaryPersonalData = {temporaryPersonalData} 
                                    onChangePersonalUserData = {onChangePersonalUserData}/>
        </div>
    )
} 

