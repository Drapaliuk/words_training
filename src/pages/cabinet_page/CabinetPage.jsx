import React from 'react';
import { useDispatch } from 'react-redux';
import { Header } from '../../components/header/Header';
import { fetchingUserPersonalData } from '../../redux/actions/personal_user_data/personal_user_data_actions';


export const CabinetPage = function() {
    const dispatch = useDispatch()
    React.useEffect(() => {
         dispatch(fetchingUserPersonalData("5f82ee64f1cb7f345ce05193"))
    }, [])


    const [isChangedFirstName, setChangeFirstName] = React.useState(false);
    const [isChangedLastName, setChangeLastName] = React.useState(false);

    return (
        <div>
            <Header />
            {
                isChangedLastName 
                                ?
                                <input type="text" name = 'lastName' placeholder = 'прізвище'/>
                                :
                                <div>
                                    <p>Драпалюк</p>
                                    <button onClick = {() => setChangeLastName(true)}>+++</button>
                                </div>
                                


            }

{
                isChangedFirstName 
                                ?
                                <input type="text" name = 'firstName' placeholder = "ім'я"/>
                                :
                                <div>
                                    <p>Віталій</p>
                                    <button onClick = {() => setChangeFirstName(true)}>+++</button> 
                                </div>
                                

            }

            
            
            

            
            

        </div>
    )
}