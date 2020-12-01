const insertingWords = (initialString, insertedWords, insertedWordPattern = '|{insertWord}|') => {
    if(!insertedWords) return 'You must pass inserted words like second arguments in this function!'
    const splittedString = initialString.split(' ');
    const isInsertedWordsPrimitive = typeof insertedWords === 'string' || typeof insertedWords === 'number'
  
    console.log(insertedWords)
    
    if(isInsertedWordsPrimitive) {
        const insertedWordIdx = splittedString.indexOf(insertedWordPattern);
        splittedString.splice(insertedWordIdx, 1, insertedWords)
        console.log('splittedString', splittedString)
        return splittedString.join(' ')
    }
  
    let resultString = '';
    let insertedWordsCounter = 0;
  
    splittedString.forEach(word => {
        if(word === insertedWordPattern) {
            resultString = `${resultString} ${insertedWords[insertedWordsCounter]}`;
            insertedWordsCounter++
            return
        }
  
        resultString = `${resultString} ${word}` 
    });
    return resultString
}