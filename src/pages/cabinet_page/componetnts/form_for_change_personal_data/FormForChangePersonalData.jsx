import React from 'react';
import styles from './styles.module.css';

export function FormForChangePersonalData(props) {
  const {temporaryPersonalData, onChange, onSave, onCancelEdit} = props;
  const { firstName, lastName, birthDay, } = temporaryPersonalData;

    return (
            <form onChange = {(event) => {
                  const payloadObject = {[event.target.name]: event.target.value}
                  onChange(payloadObject)
                }}
                  onSubmit = {event => {
                    event.preventDefault()
                    onSave()
                }}

                className = {styles['form']}
            >
                <input name = 'firstName' value = {firstName} placeholder = "ім'я"/>
                <input name = 'lastName' value = {lastName} placeholder = 'прізвище'/>
                <input name = 'birthDay' value = {birthDay} placeholder = 'дата народження'/>
                <button type = 'submit' className = {styles['save-button']}>Зберегти</button>
                <button type = 'button' className = {styles['cancel-button']} onClick = {onCancelEdit}> Відмінити </button>
            </form>
    )
}