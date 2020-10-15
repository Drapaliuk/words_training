//!  use RESELECT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export const wordKitSelectors = {
    isCheckedSomeWordFromCurrentKit: state => {
        const selectedWords = state.trainingCommonData.selectedWords;
        const initialisedWords = state.trainingCommonData.initialisedWords;

        const selectedWordsIds = selectedWords.map(el => el._id);
        const isSelectedSomeWord = initialisedWords.find(el => selectedWordsIds.includes(el._id));

        return Boolean(isSelectedSomeWord);
    },

    isCheckedFullCurrentWordsKit: state => {
        const selectedWords = state.trainingCommonData.selectedWords;
        const initialisedWords = state.trainingCommonData.initialisedWords;

        const selectedWordsIds = selectedWords.map(el => el._id);
        const selectedWordsFromCurrentKit = initialisedWords.filter(el => selectedWordsIds.includes(el._id));

        const isSelectedAllWords = initialisedWords.length === selectedWordsFromCurrentKit.length;

        return isSelectedAllWords;
    }
}