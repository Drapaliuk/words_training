export const requiredField = value => {
    if(value) return
    
   return 'Field is required'
}

export const maxLength = max => value => {
    if(value && value.length < max) return
    return 'Field must contain less 15 symbol'
}

export const minLength = min => value => {
    if(value && value.length < min) return
    return 'Field must contain more than 4 symbol'
}