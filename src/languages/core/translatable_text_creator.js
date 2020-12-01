import React from 'react';
import { LanguageConsumer } from '../context';
import { insertingWords } from './service_function/inserting_words';





export const translatableTextsCreator = translations => dictionaryPart => (key, accessOutsideKey, insertedWords) => {
    const selectedLanguage = React.useContext(LanguageConsumer);
    
    if(insertedWords) {
        return insertingWords(translations[dictionaryPart][key][selectedLanguage], insertedWords)
    }

    if(!key && accessOutsideKey) {
        const [dictionaryPart, key] = accessOutsideKey;
        if( !translations[dictionaryPart][key] ) {
            console.error(`Cant find ${key} of ${dictionaryPart} `)
            return 'error'
        }

        if(!translations[dictionaryPart]) {
            console.error(`Cant find ${dictionaryPart} `)
            return 'error'
        }

        return translations[dictionaryPart][key][selectedLanguage]
    }

    return translations[dictionaryPart][key][selectedLanguage]
};