import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../../components';
import {fetchingUserVocabulary} from '../../../redux/actions/user_content_store/user_vocabulary/user_vocabulary_actions';
import { fetchingUserWordSets } from '../../../redux/actions/user_content_store/user_words_kits/user_words_kits_actions';
import { VocabularyEditor } from './components/vocabulary_editor/VocabularyEditor';
import UserWordSetCreator from './components/user_word_set_creator/UserWordSetCreator';
import styles from './VocabularyPage.module.css';


export function UserVocabulary() {
    const dispatch = useDispatch()

    const userId = useSelector(state => state.authorization.userId)

    React.useEffect(() => {
        dispatch(fetchingUserVocabulary(userId))
    }, [])

    React.useEffect(() => {
        dispatch(fetchingUserWordSets())
    })

    const vocabulary = useSelector((state) => state.userContentStore.vocabulary);
    const [showCreatorButton, setStatusShowSetCreatorButton] = React.useState(true);
    const [showWordSetCreator, setShowStatusWordSetCreator] = React.useState(false);


    return (
        <div>
            <Header />
            { <VocabularyEditor words = {vocabulary} 
                                showWordSetCreator = {showWordSetCreator}
                                
              /> }

            {
                showCreatorButton   ?
                                        <button className = {styles['show-set-creator-button']} 
                                                onClick = {() => {
                                                    setShowStatusWordSetCreator(true);
                                                    setStatusShowSetCreatorButton(false)
                                                }}
                                        >
                                            Створити власний набір слів
                                        </button> 
                                    : null
            }

            {
                showWordSetCreator ? 
                                     <UserWordSetCreator setStatusShowSetCreatorButton = {setStatusShowSetCreatorButton}
                                                         setShowStatusWordSetCreator = {setShowStatusWordSetCreator}
                                                          /> 
                                   : null
            }
            
        </div>
    )
}