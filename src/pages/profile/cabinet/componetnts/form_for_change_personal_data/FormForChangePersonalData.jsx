import React from 'react';
import styles from './styles.module.css';
import { translatableText } from '../../../../../languages/instances/profile';

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
                <input name = 'firstName' value = {firstName} placeholder = { translatableText('name') } />
                <input name = 'lastName' value = {lastName} placeholder = { translatableText('surename') } />
                <input name = 'birthDay' value = {birthDay} placeholder = { translatableText('birthday') } />
                <button type = 'submit' className = {styles['save-button']}> {translatableText('save')} </button>
                <button type = 'button' className = {styles['cancel-button']} onClick = {onCancelEdit}> {translatableText('cancel')} </button>
            </form>
    )
}