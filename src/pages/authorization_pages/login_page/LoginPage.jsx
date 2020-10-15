import React from 'react'
import { Header } from '../../../components'
import { LoginForm } from './components/LoginForm'
import { logining } from '../../../redux/actions/authorization/authorization_action';
import { useDispatch, useSelector } from 'react-redux';

export function LoginPage() {
    const dispatch = useDispatch();
    const loginData = useSelector(state => {
        if(state.form.loginForm) {
            return state.form.loginForm.values
        }
    })

    const onLogin = (loginData) => {
        dispatch(logining(loginData))
    }

    return (
        <div>
            <Header />
            <LoginForm onSubmit = {() => onLogin(loginData)} />
        </div>
    )
}

