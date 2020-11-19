import React from 'react';
import { LanguageConsumer } from '../context';

export const translatableTextsCreator = translations => dictionaryPart => (key, accessOutsideKey) => {
    const selectedLanguage = React.useContext(LanguageConsumer);
    
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














// import React from 'react';
// import { LanguageConsumer } from '../context';

// export const translatableTextsCreator = translations => dictionaryPart => (key, accessOutsideKey, returnString) => {
//     const selectedLanguage = React.useContext(LanguageConsumer);
//     if(returnString) return translations[dictionaryPart][key][selectedLanguage]


//     const renderText = selectedLanguage => {
//         if(!key && accessOutsideKey) {
//             const [dictionaryPart, key] = accessOutsideKey;
//             if( !translations[dictionaryPart][key] ) {
//                 console.error(`Cant find ${key} of ${dictionaryPart} `)
//                 return 'error'
//             }

//             if(!translations[dictionaryPart]) {
//                 console.error(`Cant find ${dictionaryPart} `)
//                 return 'error'
//             }

//             return translations[dictionaryPart][key][selectedLanguage]
//         }

//         return translations[dictionaryPart][key][selectedLanguage]
//     }

//     return (
//         <LanguageConsumer>
//             {renderText}
//         </LanguageConsumer>
//     )
// };