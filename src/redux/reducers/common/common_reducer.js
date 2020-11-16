import { LOADING, LOADED } from '../../action_types/index'

const initialState = {
    loading: false,
    loaded: false
}


export const commonReducer = (prevState = initialState, action) => {
    switch(action.type) {
        case LOADING: 
            return {
                ...prevState,
                loading: true,
                loaded: false
            }
        case LOADED:
            return {
                ...prevState,
                loading: false,
                loaded: true
            }
        default:
            return prevState
    }
}

