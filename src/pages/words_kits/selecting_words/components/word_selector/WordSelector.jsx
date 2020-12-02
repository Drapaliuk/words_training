import React from 'react';
import { selectingAllWords, selectingWord, unSelectingWord, unSelectingFullWordsKit } from '../../../../../redux/actions/training/common/common_training_actions';
import { commonDataSelectors, wordKitSelectors, authorizationSelectors } from '../../../../../redux/selectors/index';
import styles from './styles.module.css';
import { EditorSelectedWords } from '../index';
import { addWordToVocabulary } from '../../../../../redux/actions/user_content_store/user_vocabulary/user_vocabulary_actions';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem } from './components/index';
import { translatableText } from '../../../../../languages/instances/word_kit';

const ternFunc = function(condition = true, conditionTrue = null, conditionFalse = null) {
        if(condition) {
            return conditionTrue
        }
        
        return conditionFalse
}




export const WordSelector = function() { 
    const dispatch = useDispatch();
    const isCheckedWordFromCurrentKit = useSelector(state => wordKitSelectors.isCheckedSomeWordFromCurrentKit(state));
    const isCheckedFullCurrentWordsKit = useSelector(state => wordKitSelectors.isCheckedFullCurrentWordsKit(state));
    const selectedWords = useSelector(state => commonDataSelectors.getSelectedWords(state));
    const words = useSelector(state => commonDataSelectors.getInitialisedWords(state));
    const userId = useSelector(state => authorizationSelectors.getUserId(state));

    let onSelectingWord = wordId => () =>  dispatch(selectingWord(wordId));
    let onUnSelectingWord = wordId => () => dispatch(unSelectingWord(wordId));

    let onSelectingFullWordsKit = () => dispatch(selectingAllWords());
    let onUnSelectingFullWordsKit = () => dispatch(unSelectingFullWordsKit());
    let onAddWordToUserVocabulary = (wordId, userId) => () => dispatch(addWordToVocabulary(wordId, userId)); //! userId mustbt be here
    
    


    let wordList = words.map(el => {
        const isSelected = selectedWords.find(word => word._id === el._id)
        return (
            <div key = {el._id}>
                <ListItem 
                    userId = {userId}
                    wordObject = {el}
                    isSelected = {isSelected}
                    onUnSelectingWord = {onUnSelectingWord}
                    onSelectingWord = {onSelectingWord}
                    onAddWordToUserVocabulary = {onAddWordToUserVocabulary}
                />
            </div>
            
        )
    })
    
   
    return(
        <div className = {styles['words-list']}>
            {wordList}
            
            <div className = {styles['selecting-buttons']}>
                {ternFunc( isCheckedFullCurrentWordsKit,
                           null,
                           <button onClick = { onSelectingFullWordsKit} className = {styles['selected-all-button']}>
                               {translatableText('selectedAll')}
                            </button>)}
                {ternFunc( isCheckedWordFromCurrentKit,
                           <button className = {styles['unselecting-all-button']} onClick = { onUnSelectingFullWordsKit }>
                                {translatableText('clearSelected')}
                            </button>)}
            </div>
            
            <div className = {styles['all-selected-words-wrapper']}>
                    <EditorSelectedWords />
            </div>  
        </div>
            
    )
}
