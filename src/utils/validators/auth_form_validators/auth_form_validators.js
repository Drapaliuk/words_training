import { invalidFormResponses } from '../index'

export const requiredField = value => {
    if(value) return
   return invalidFormResponses.requiredField
}

export const maxLength = max => value => {
    if(value && value.length < max) return
    return invalidFormResponses.tooLong
}

export const minLength = min => value => {
    if(value && value.length > min) return
    return invalidFormResponses.tooShort
}