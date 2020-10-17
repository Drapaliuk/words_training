import React from 'react'
import { Field, reduxForm } from 'redux-form';
import styles from '../LoginPage.module.css';
import { authorizationSelectors } from '../../../../redux/selectors/authorization_selectors';
import { useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
function Form(props) {
    const isAuthorization = useSelector(state => authorizationSelectors.isAuthorization(state))
    if(isAuthorization) {
       return <Redirect to = '/intro' />
    }

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