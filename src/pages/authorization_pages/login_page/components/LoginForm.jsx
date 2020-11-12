import React from 'react'
import { Field, reduxForm } from 'redux-form';
import styles from '../LoginPage.module.css';
import { authorizationSelectors } from '../../../../redux/selectors/authorization_selectors';
import { useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { FormField } from '../../components/index';
import { requiredField, maxLength, minLength } from '../../../../utils/validators/index';

const maxLength10 = maxLength(10);
const minLength4 = minLength(4)

function Form(props) {
    const isAuthorization = useSelector(state => authorizationSelectors.isAuthorization(state))
    if(isAuthorization) {
       return <Redirect to = '/intro' />
    }

    return (
        <div className = {styles['auth-form-wrapper']} >
            <form className = {styles['auth-form']} onSubmit = {props.handleSubmit}>
                <Field className = {styles['auth-login-input']} 
                       validate = {[requiredField, maxLength10, minLength4]} 
                       component = {FormField} 
                       name = 'login' />

                <Field className = {styles['auth-password-input']} 
                       validate = {[requiredField, maxLength10, minLength4]} 
                       component = {FormField} 
                       name = 'password' />

                <button className = {styles['auth-button']}>Увійти</button>
            </form>
        </div>
    )
}
export const LoginForm = reduxForm({form: 'loginForm'})(Form)