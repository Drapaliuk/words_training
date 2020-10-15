import { COLLECTING_COMMON_STATISTICS, SKIP_TASK_COMMON } from '../../action_types/index';
import { commonDataSelectors } from '../../selectors/common_data_selectors';

export const collectingCommonStatistics = function(store) { //якщо в мене є доступ через стор до діспатчу, то потрібно опробувати це
    return (next) => (action) => {
        if(action.type === SKIP_TASK_COMMON) { // при скіпі додається налл виправити
            const state = store.getState()
            const currentTrainingModeId = commonDataSelectors.getCurrentTrainingModeId(state);
            const currentTaskStatistics = commonDataSelectors.getCurrentTaskStatistics(state, currentTrainingModeId);
            const payload = { ...currentTaskStatistics,
                isSkipped: true,
                timestamps: {...currentTaskStatistics.timestamps, 
                                end: Date.now(new Date()),
                                amount: (Date.now(new Date()) - currentTaskStatistics.timestamps.start) 
                            }
                };
            return next({ ...action, payload })
        }

        if(action.type === COLLECTING_COMMON_STATISTICS) { //чи існує якесь позначення що додаткові операції з диспатчом виконуються в мідлварі
            const state = store.getState()
            const currentTrainingModeId = commonDataSelectors.getCurrentTrainingModeId(state);
            const currentTaskStatistics = commonDataSelectors.getCurrentTaskStatistics(state, currentTrainingModeId);
            const payload = { ...currentTaskStatistics};
            return next({...action, payload })
        }
        return next(action)
    }
}