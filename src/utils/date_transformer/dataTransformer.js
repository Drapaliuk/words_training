export const dataTransformer = function(unixTime, language = 'ukr') {
    const date = new Date(unixTime);

    const fullDateInfo = {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay(),
        date: date.getDate()  < 10 ? '0' + date.getDate() : date.getDate(),
        hours: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        milliseconds: date.getMilliseconds()
    }
    

    if(language === 'ukr') {
        const months = ['січень', 'лютий', 'березень', 'квітень', 'травень', 'червень', 'липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень', ]
        const days = ['неділя', 'вівторок', 'середа', 'четвер', "п'ятниця", 'субота', 'понеділок']
    }

    return fullDateInfo
  
}