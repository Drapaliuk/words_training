import React from 'react'
import { Header } from '../../components/header/Header'

export const CabinetPage = function() {

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