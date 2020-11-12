import React from 'react'
import { SignInForm } from './components/SignInForm'
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../../redux/actions/authorization/authorization_action';

import { Header } from '../../../components';

export function SignInPage() {
    const dispatch = useDispatch();
    const [loginHasAlreadyUse, setLoginHasAlreadyUse] = React.useState(false);

    const signInData = useSelector(state => {
        if(state.form.signInForm) {
            return state.form.signInForm.values
        }
    })

    const onSignIn = (signInData) => (event, second) => {
        console.log('event', event)
        console.log('second', second)
        dispatch(signIn(signInData))
    }
    
    return (
        <div>
            <Header />
            <SignInForm onSubmit = { onSignIn(signInData) } />
        </div>
    )
}