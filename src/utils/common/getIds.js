export const getIds = (data) => {
    if(Object.prototype.toString.call(data) === '[object Object]') return data._id || data.id;
    if(Object.prototype.toString.call(data) === '[object Array]') return data.map(el => el._id || el.id)
    console.error('You can pass only object or arr with objects')
}