export const personalUserDataSelectors = {
    getFullPersonalUserData: state => state.personalUserData.personalData,
    getTemporaryPersonalUserData: state => state.personalUserData.temporaryPersonalData
};