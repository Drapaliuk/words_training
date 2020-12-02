import React from 'react';
import styles from './SquareForLetter.module.css'

class SquareForLetter extends React.Component {
    render() {
        return (
            <div className = {styles.square}>
                {this.props.text}
            </div>
        )
    }

}

export default SquareForLetter