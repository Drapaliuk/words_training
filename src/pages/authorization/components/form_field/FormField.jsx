import React from 'react';
import styles from './styles.module.css';


export function FormField({input, meta, ...props}) {
    const invalidFormErrCode = meta.error ? meta.error.errCode : null;
    const condition = errCode => invalidFormErrCode === (errCode + '') && meta.touched;
    console.group()
    console.log(meta)
    console.groupEnd()
    let invalidText;
    if(condition(3)) {invalidText = "Поле обов'язкове для заповнення";}
    if(condition(2)) {invalidText = `Максимальна кількість ${10} символів`}
    if(condition(1)) {invalidText = `Мінімальна кількість ${4} символів`}
    console.log(invalidText)
    return (
        <div className = {styles['container']}>
                <input {...input} {...props}/>
                { invalidText && <span className = {styles['invalid-message']}>{invalidText}</span>}
        </div>
    )
}



