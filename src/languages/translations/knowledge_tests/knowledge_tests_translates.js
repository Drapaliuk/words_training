import { getKeys } from '../../get_keys/get_keys';

export const knowledgeTestsTranslations = {
    doYouKnowThisWord: {eng: 'Do you know this word?', ukr: 'Ви знаєте це слово?', rus: 'Вы знаете это слово?'},
    resultsVocabularyTest: {eng: 'Your vocabulary is |{pastedWord}| words', ukr: 'Ваш словниковий запас складає |{pastedWord}| слів', rus: 'Ваш словарный запас составляет |{pastedWord}| слов'}
}

export const trainingKeys = getKeys(knowledgeTestsTranslations) 
// {eng: '', ukr: '', rus: ''}
