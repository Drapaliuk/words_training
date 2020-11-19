import { createStore, applyMiddleware, compose} from 'redux';
import thunkMiddlewere from 'redux-thunk';
import { combinedReducers } from './reducers/combined_reducers';
import { collectingCommonStatistics, clearSelectedWordsCurrentWordset, 
         selectingFullKit, unSelectingFullWordsKit, personalUserData, continueTrainingMiddleware } from './middlewares/index';


const middlewares = [ 
                      thunkMiddlewere, clearSelectedWordsCurrentWordset, 
                      collectingCommonStatistics, unSelectingFullWordsKit, 
                      selectingFullKit, personalUserData, continueTrainingMiddleware
                    ]



const composeEnhsncer  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(combinedReducers, composeEnhsncer(applyMiddleware(...middlewares)))
window.store = store;

export default store;