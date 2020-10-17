import React from 'react';
import styles from './styles.module.css';

export function FormForChangePersonalData({temporaryPersonalData, onChangePersonalUserData, onSaveNewPersonalUserData}) {
    const { firstName = '-', lastName = '-', birthDay = '-', } = temporaryPersonalData;

    return (
            <form onChange = {(event) => {
                  const payloadObject = {[event.target.name]: event.target.value}
                  onChangePersonalUserData(payloadObject)
                }}
                  onSubmit = {event => {
                    event.preventDefault()
                    onSaveNewPersonalUserData()
                }}

                className = {styles['form']}
            >
                <input name = 'firstName' value = {firstName} placeholder = "ім'я"/>
                <input name = 'lastName' value = {lastName} placeholder = 'прізвище'/>
                <input name = 'birthDay' value = {birthDay} placeholder = 'дата народження'/>
                <button className = {styles['save-button']}>Зберегти</button>
            </form>
    )
}

//! FormForChangePersonalData