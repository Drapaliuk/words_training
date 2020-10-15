import React from 'react'
import { Field, reduxForm } from 'redux-form';
import styles from '../LoginPage.module.css';
function Form(props) {
    return (
        <div className = {styles['auth-form-wrapper']} >
            <form className = {styles['auth-form']} onSubmit = {props.handleSubmit}>
                <Field className = {styles['auth-login-input']} component = 'input' name = 'login' />
                <Field className = {styles['auth-password-input']} component = 'input' name = 'password' />
                <button className = {styles['auth-button']}>Увійти</button>
            </form>
        </div>
    )
}
export const LoginForm = reduxForm({form: 'loginForm'})(Form)