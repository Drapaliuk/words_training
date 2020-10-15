import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {wordTestSelectors, commonDataSelectors} from '../../../../redux/selectors/index';
import {selectingVariant} from '../../../../redux/actions/spelling_test_actions';
import {VariantListItem} from './VariantListItem';

export const VariantList = function () {
    const dispatch = useDispatch()
    const variantList = useSelector(state => wordTestSelectors.getVariantList(state));
    const needHint = useSelector(state => wordTestSelectors.needHint(state));
    const currentWord = useSelector(state => commonDataSelectors.getCurrentWord(state));
    const questionLang = useSelector(state => wordTestSelectors.getQuestionLang(state));
    const answerWord = useSelector(state => wordTestSelectors.getAnswerWord(state));
    const isTrueAnswer = useSelector(state => wordTestSelectors.isTrueAnswer(state));
    const answerLang = useSelector(state => wordTestSelectors.getAnswerLang(state));

    let hintWordCounter = 0;
    
    const onSelectingVariant = (selectedVariant) => {
        return () => {
            dispatch(selectingVariant(selectedVariant))
            
        }
    }


    return (
        variantList.map((el, idx) => {
            const isRightWord = el._id === currentWord._id; //чому тут 2 однакові змінні isTrueAnswer isRightWord
    
            if(isRightWord) {
                return <VariantListItem key = { el._id + idx } 
                                        onClick = { onSelectingVariant(el) }
                                        value = { el[questionLang] }
                                        text = { answerWord  }
                                        isTrueAnswer = { isTrueAnswer } />
            }
    
            if(needHint && hintWordCounter < 2 && !isRightWord){
                hintWordCounter++
                return <VariantListItem key = { el._id + idx } 
                                        value = { el[questionLang] }
                                        onClick = { onSelectingVariant(el) }
                                        isDisabled = { true } 
                                        text = {'  '}
                                        />
            }
    
            return <VariantListItem key = { el._id + idx} 
                                    isDisabled = { isTrueAnswer }
                                    value = { el[questionLang] }
                                    onClick = { onSelectingVariant(el) } 
                                    text = { el[answerLang] } //чому тут потрібно саме так, а не так як на стрічку нижче????
                                    // text = { answerWord }
                                    isTrueAnswer = {isRightWord}
                                    />
        })
    )
}