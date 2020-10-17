import { createStore, applyMiddleware, compose} from 'redux';
import thunkMiddlewere from 'redux-thunk';
import { combinedReducers } from './reducers/combined_reducers';
import { variantListCreator, initializationSplittedAnswerWord, createEducationPlan,
         mistakeCreator, collectingCommonStatistics, clearSelectedWordsCurrentWordset,
         selectingFullKit, unSelectingFullWordsKit, personalUserData } from './middlewares/index';


const middlewares = [ 
                      thunkMiddlewere,  variantListCreator, mistakeCreator,
                      clearSelectedWordsCurrentWordset, unSelectingFullWordsKit,
                      collectingCommonStatistics, initializationSplittedAnswerWord,
                      createEducationPlan, selectingFullKit, personalUserData
                    ]



const composeEnhsncer  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(combinedReducers, composeEnhsncer(applyMiddleware(...middlewares)))
window.store = store;

export default store;