import React from 'react'
import { useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styles from '../SignInPage.module.css';
import { authorizationSelectors } from '../../../../redux/selectors/index';
import { NavLink, Redirect } from 'react-router-dom';
import { requiredField, maxLength, minLength } from '../../../../utils/validators/index';
import { FormField } from '../../components/form_field/FormField';
import { translatableText } from '../../translatable_text';

const maxLength10 = maxLength(10);
const minLength4 = minLength(4)



function Form(props) {
    const isAuthorization = useSelector(state => authorizationSelectors.isAuthorization(state))
    if(isAuthorization) {
        return (
        <div className = {styles['auth-form-wrapper']} >
            <p className = {styles['success-registration']}> {translatableText('signed')} </p>
        <NavLink className = {styles['link-to-main-page']} to = '/intro'> &#8678; {translatableText('toMainPage')}</NavLink>
        </div>
        )
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

                <button className = {styles['auth-button']}>{translatableText('signin')}</button>
            </form>
        </div>
    )
}
export const SignInForm = reduxForm({form: 'signInForm'})(Form)