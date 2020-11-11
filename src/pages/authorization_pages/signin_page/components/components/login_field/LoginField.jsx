import React from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';
export function LoginField({input, meta, ...props}) {
    console.log(meta.error)
    return (
        <div className = {styles.error}>
            <input  {...input} {...props}/>
            <span>asdasdas</span>
        </div>
    )
}

