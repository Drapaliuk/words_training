import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/header/Header';
import { fetchingUserPersonalData } from '../../redux/actions/personal_user_data/personal_user_data_actions';
import { personalUserDataSelectors } from '../../redux/selectors/personal_user_data/personal_user_data_selector';
import { ChangePersonalDataForm } from './componetnts/index';
import { changePersonaUserData, saveNewPersonalUserData } from '../../redux/actions/personal_user_data/personal_user_data_actions';

import { styles } from './CabinetPage.module.css'

export const CabinetPage = function() {
    const dispatch = useDispatch()
    React.useEffect(() => {
         dispatch(fetchingUserPersonalData("5f82ee64f1cb7f345ce05193"))
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
        dispatch(saveNewPersonalUserData())
    }

    console.log(personalData)
    const [isVisibleChangeForm, setVisibleChangeForm] = React.useState(false);
    const [isVisiblePersonalData, setVisiblePersonalData] = React.useState(false);

    return ( 
        <div>
            <Header />

            <div>
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

            <ChangePersonalDataForm onSaveNewPersonalUserData = {onSaveNewPersonalUserData} temporaryPersonalData = {temporaryPersonalData} onChangePersonalUserData = {onChangePersonalUserData}/>

           


        </div>
    )
} 

