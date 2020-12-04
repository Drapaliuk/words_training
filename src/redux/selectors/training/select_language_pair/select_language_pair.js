export const getAvailableLanguagesForTraining = state => state.trainingCommonData.availableLanguagesForTraining;
export const getLanguagePair = state => state.trainingCommonData.languagePair;
export const getLanguagePairCodes = ({trainingCommonData}) => {
    const { firstLanguage, secondLanguage } = trainingCommonData.languagePair;
    return [firstLanguage.code, secondLanguage.code ]
}