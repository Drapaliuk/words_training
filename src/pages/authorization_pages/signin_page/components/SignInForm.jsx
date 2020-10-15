import React from 'react'
import { useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styles from '../SignInPage.module.css';
import { authorizationSelectors } from '../../../../redux/selectors/index';
import { NavLink, Redirect } from 'react-router-dom';

function Form(props) {
    const isAuthorization = useSelector(state => authorizationSelectors.isAuthorization(state))
    if(isAuthorization) {
        return (
        <div className = {styles['auth-form-wrapper']} >
            <p className = {styles['success-registration']}>Зареєстровано</p>
            <NavLink className = {styles['link-to-main-page']} to = '/intro'> &#8678; На головну сторінку</NavLink>
        </div>
        )
    }
    
    return (
        <div className = {styles['auth-form-wrapper']} >
            <form className = {styles['auth-form']} onSubmit = {props.handleSubmit}>
                <Field className = {styles['auth-login-input']} component = 'input' name = 'login' />
                <Field className = {styles['auth-password-input']} component = 'input' name = 'password' />
                <button className = {styles['auth-button']}>Зареєструватися</button>
            </form>
        </div>
    )
}
export const SignInForm = reduxForm({form: 'signInForm'})(Form)