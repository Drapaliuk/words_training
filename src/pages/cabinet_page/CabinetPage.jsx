import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/header/Header';
import { fetchingUserPersonalData } from '../../redux/actions/personal_user_data/personal_user_data_actions';
import { personalUserDataSelectors } from '../../redux/selectors/personal_user_data/personal_user_data_selector';
import { styles } from './CabinetPage.module.css'

export const CabinetPage = function() {
    const dispatch = useDispatch()
    React.useEffect(() => {
         dispatch(fetchingUserPersonalData("5f82ee64f1cb7f345ce05193"))
    }, [])


    const personalData = useSelector(state => {
        return personalUserDataSelectors.getFullPersonalUserData(state, null, 'age', 'country')
    })

    console.log(personalData)

    const [isChangedFirstName, setChangeFirstName] = React.useState(false);
    const [isChangedLastName, setChangeLastName] = React.useState(false);

    return ( 
        <div>
            <Header />

            <div>
                <div>Особисті дані</div>
                <button>...</button>
                <div>
                    
                </div>
            </div>

            {
                isChangedLastName 
                                ?
                                <input type="text" name = 'lastName' placeholder = 'прізвище'/>
                                :
                                <div>
                                    <p>{personalData.lastName}</p>
                                    <button onClick = {() => setChangeLastName(true)}>+++</button>
                                </div>
            }

{
                isChangedFirstName 
                                ?
                                <input type="text" name = 'firstName' placeholder = "ім'я"/>
                                :
                                <div>
                                    <p>{personalData.firstName}</p>
                                    <button onClick = {() => setChangeFirstName(true)}>+++</button> 
                                </div>
            }
        </div>
    )
} 