import { SELECT_LANGUAGE } from "../../../action_types";

export const selectLanguage = selectedLanguage => {
    return {type: SELECT_LANGUAGE, selectedLanguage}
}