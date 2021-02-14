import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import  { authorizationSelectors } from './redux/selectors/index';
import  { SpellingTraining, WordTraining, SelectingWords, TrainingResults, KnowledgeTestResults,
          Introduction, MixedTraining, SelectingWordsKit,PausedTrainings,
          VocabularyTest, UserVocabulary, Login, SignIn, Cabinet } from './pages/index'
import { checkAuthorization } from './redux/actions/authorization/authorization_actions';
import { LanguageContext } from './languages/context';






function App() {
  const dispatch = useDispatch();
  const isAuthorization = useSelector(state => authorizationSelectors.isAuthorization(state));
  const selectedLanguage = useSelector(state => state.personalUserData.selectedLanguage);
  React.useEffect(() => {
    if(!isAuthorization){
      dispatch(checkAuthorization())
    }
 
  }, [])


  return (
    <LanguageContext.Provider value = {selectedLanguage}>
      <BrowserRouter> 
        <Route path = {'/knowledgetests/results'} component = {KnowledgeTestResults} />
        <Route path = {'/pausedTrainings'} component = {PausedTrainings} />
        <Route path = {'/selectWordSet'} component = {SelectingWordsKit} />
        <Route path = {'/vocabularyTest'} component = {VocabularyTest} />
        <Route path = {'/userVocabulary'} component = {UserVocabulary} />
        <Route path = {'/intro'} component = { Introduction } />
        <Route path = {'/login'} component = { Login } />
        <Route path = {'/signin'} component = { SignIn } />
        <Route path = {'/mixed'} component = { MixedTraining } />
        <Route path = {'/cabinet'} component = { Cabinet } />

        <Route path = {'/training'} render = {(history) => {
          return(
            <SpellingTraining {...history} />
          )
        }} />

        <Route path = {'/byword'} render = {(history) => {
          return (
            <WordTraining {...history} />
          )
        }} />

        <Route path = {'/result'} render = {(history) => {
          return (
            <TrainingResults {...history} />
          )
        }} />

        <Route path = {'/wordset/:setName'} render = {(history) => {
          return (
            <SelectingWords {...history} />
          )
        }} />
      </BrowserRouter>
    </LanguageContext.Provider>
          
  );
}

export default App;
