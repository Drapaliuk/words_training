import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteSelectedWord, clearSelectedWords } from '../../../../redux/actions/training/common/common_training_actions';
import styles from './styles.module.css';
import { ClearSelectedWords, SelectedWordsLabel, SelectedWordsList } from './components/index';

export function EditorSelectedWords() {
    const [isVisibleSelectedWordsList, setVisibleSelectedWordsList] = React.useState(false);
    const dispatch = useDispatch();

    const onDeleteSelectedWord = (id) => {
        dispatch(deleteSelectedWord(id))
    };

    const onClearSelectedWords = () => {
        dispatch(clearSelectedWords())
        setVisibleSelectedWordsList(!isVisibleSelectedWordsList)
    };

    const selectedWords = useSelector((state) => {
        return state.trainingCommonData.selectedWords
    });

    const isSomeSelectedWord = selectedWords.length > 0


    return (
        <div className = {styles['selected-words-wrapper']}>
            {
                isSomeSelectedWord
                    ? 
                    <SelectedWordsLabel isVisibleSelectedWordsList = {isVisibleSelectedWordsList}
                                        setVisibleSelectedWordsList = {setVisibleSelectedWordsList}
                                        selectedWordsAmount = {selectedWords.length}  />
                    : 
                    null
            }
            {
                isVisibleSelectedWordsList && selectedWords.length > 0 
                    ? 
                        <ClearSelectedWords onClearSelectedWords = {onClearSelectedWords} />
                    : 
                        null
            }

            { 
                isVisibleSelectedWordsList 
                    ?
                    <SelectedWordsList selectedWords = {selectedWords} onDeleteSelectedWord = {onDeleteSelectedWord} />
                    :
                    null
                
            }
        </div>
    )
}
