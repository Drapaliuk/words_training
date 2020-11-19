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
}

export const trainingKeys = getKeys(trainingTranslations) 
// {eng: '', ukr: '', rus: ''}
