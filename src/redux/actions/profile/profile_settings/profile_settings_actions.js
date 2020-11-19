import { SELECT_LANGUAGE } from "../../../action_types";

export const selectLanguage = selectedLanguage => {
    console.log(selectedLanguage)
    return {type: SELECT_LANGUAGE, selectedLanguage}
}