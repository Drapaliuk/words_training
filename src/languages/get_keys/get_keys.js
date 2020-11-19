export const getKeys = obj => {
    const keys = {}
    for(let key in obj) {
        keys[key] = key;
    }
    return keys
    
}