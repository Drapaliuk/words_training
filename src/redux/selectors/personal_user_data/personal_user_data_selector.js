export const personalUserDataSelectors = {
    getFullPersonalUserData: state => state.personalUserData,
    getTemporaryPersonalUserData: state => state.personalUserData.temporaryPersonalData

}