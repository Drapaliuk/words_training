import { getKeys } from '../../get_keys/get_keys';

export const trainingTranslations = {
    skipTask: {eng: 'Skip', ukr: 'Пропустити', rus: 'Пропустить'},
    nextTask: {eng: 'Next', ukr: 'Наступне завдання', rus: 'Следующее задание'},
    completeLeter: {eng: 'Сomplete later', ukr: 'Завершити пізніше', rus: 'Закончить позже'},
    results: {eng: 'Results', ukr: 'Результат', rus: 'Результаты'},
    taskWasSkipped: {eng: 'The task was skipped', ukr: 'Завдання було пропущене', rus: 'Задание было пропущено'},
    task: {eng: 'Task', ukr: 'Завдання', rus: 'Задание'},
    perfect: {eng: 'Perfect', ukr: 'Бездоганно', rus: 'Безупречно'},
    taskWithHint: {eng: 'A hint was used', ukr: 'Була використана підказка', rus: 'Была использована подсказка'},
    time: {eng: 'Time', ukr: 'Час', rus: 'Время'},
    details: {eng: 'More details', ukr: 'Детальніше', rus: 'Подробнее'},
    finishLater: {eng: 'Finish later', ukr: 'Закінчити пізніше', rus: 'Завершить позже'},
    tasksLeft: {eng: '|{insertWord}| tasks left', ukr: 'Залишилось |{insertWord}| завдань', rus: 'Осталось |{insertWord}| задания'},
    exit:  {eng: 'Exit', ukr: 'Вийти', rus: 'Выйти'},
    seriouslyWantFinish: {eng: 'Are you seriously want finish this training?', ukr: 'Ви серйозно бажаєте завершити це тренування?', rus: 'Вы серьезно хотите закончить эту тренировку?'},
    itIsLastTask: {eng: 'It is last task', ukr: 'Це останнє завдання', rus: 'Это последнее задание'},
    continue: {eng: 'Continue', ukr: 'Продовжити', rus: 'Продолжить'},
    comment: {eng: 'comment', ukr: 'коментар', rus: 'коментарий'}

}

export const trainingKeys = getKeys(trainingTranslations) 
// {eng: '', ukr: '', rus: ''}
