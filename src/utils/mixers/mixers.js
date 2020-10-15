const a = 1;
export const mixingElement = function(arr) {
    const copyArr = arr.slice()
    const permanentLength = copyArr.length + 1 
    let serviceLength = copyArr.length

    const resultArr = []
    
    for(let i = 0; i < permanentLength; i++) {
        const randomNumber1 = (Math.random() * (serviceLength - 0) + 0).toFixed(0) //межа
        resultArr.push(copyArr[randomNumber1])
        copyArr.splice(randomNumber1, 1)
        serviceLength -=1
    }
    return resultArr.filter(el => {
        return el
    })
}



export const getRandomElement = function(arr, amount, exclusionElement) {
    if(arr.length < amount) {
        console.error('Too short!')
        return
    }
    const arrCopy = arr.slice();
    const permanentLength = (arrCopy.length - 1)
    let serviceLength = arrCopy.length
    let resultArr = []
    let randomNumberPull = []

    for(let i = 0; randomNumberPull.length < amount; i++) {
        const randomNumber = +(Math.random() * (permanentLength - 0) + 0).toFixed(0)
        if(!randomNumberPull.includes(randomNumber) && randomNumber !== exclusionElement) {
            randomNumberPull.push(randomNumber)
        }
    }

    for(let i = 0; i < randomNumberPull.length; i++) {
        resultArr.push(arrCopy[randomNumberPull[i]])
    }

    return resultArr
}

export const createTrainingList = function(amountWords, arrTrainTypesId, selectedLanguage = ['ua', 'eng']) {
    let counter = 0
    let questionLang;
    console.log('amountWords', amountWords)
    const trainingList = Array(amountWords).fill().map((el, idx) => {
        if(counter === arrTrainTypesId.length){
            counter = 0
        }

        if(idx % 2 === 0) {
            questionLang = selectedLanguage[0]
        } else {
            questionLang = selectedLanguage[1]
        }

        let trainingId = { trainingId: arrTrainTypesId[counter],
                           questionLang }

        counter++
        return trainingId
    })

    return trainingList
}