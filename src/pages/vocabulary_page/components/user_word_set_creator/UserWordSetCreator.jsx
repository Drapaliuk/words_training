import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import styles from './UserWordSetCreator.module.css';
import { createWordSet } from '../../../../redux/actions/user_content_store/user_word_sets_actions';

const Form = function(props) {
    const { setStatusShowSetCreatorButton, setShowStatusWordSetCreator } = props
    const [isEmptyInput, setStatusInput] = React.useState(true);
    const onInputChange = (info, actualValue) => {
        setStatusInput(!Boolean(actualValue))
    }

    return (
        <div className = {styles['form-wrapper']}>
            <form className = {styles['form']} onSubmit = {props.handleSubmit}>
                <div className = {styles['input-block']}>
                    <Field name = 'wordSetName' 
                       placeholder = 'Введіть назву набору' 
                       component = 'input' 
                       className = {styles['input']}
                       onChange = {onInputChange}
                    />
                    <button className = {styles['cancel-button']} onClick = {() => {
                        setStatusShowSetCreatorButton(true)
                        setShowStatusWordSetCreator(false)
                    }}>
                        X
                    </button>
                </div>
                
                
                
                
                
                {
                    isEmptyInput ? null : <button className = {styles['submit-button']} type = 'submit'>Створити</button>
                }
                
            </form>
        </div>
    )
}

const WithReduxForm = reduxForm({form: 'userWordSet'})(Form);


function UserWordSetCreator(props) {
    const dispatch = useDispatch()
    const selectedWords = useSelector(state => state.userContentStore.selectedWords)
    const { setStatusShowSetCreatorButton, setShowStatusWordSetCreator } = props
    const onSubmit = function(value) {
        dispatch(createWordSet({...value, words: selectedWords}))
    }
        return (
            <WithReduxForm onSubmit = {onSubmit}
                           setStatusShowSetCreatorButton = {setStatusShowSetCreatorButton}
                           setShowStatusWordSetCreator = {setShowStatusWordSetCreator}
            />
        )
}



export default UserWordSetCreator