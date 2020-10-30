import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import  { SpellingPage, TestWordPage, SelectingWordsPage, ResultPage,
          IntroductionPage, MixedTestPage, SelectingWordsKitPage,PausedTrainingsPage,
          KnowledgeTestPage, VocabularyPage, LoginPage, SignInPage, CabinetPage } from './pages/index'




function App() {
  const AuthContext = React.createContext(false)
  return (
        <AuthContext.Provider value = {false}>
          <BrowserRouter>
            <Route path = {'/pausedTrainings'} component = {PausedTrainingsPage} />
            <Route path = {'/selectWordSet'} component = {SelectingWordsKitPage} />
            <Route path = {'/vocabularyTest'} component = {KnowledgeTestPage} />
            <Route path = {'/userVocabulary'} component = {VocabularyPage} />
            <Route path = {'/intro'} component = { IntroductionPage } />
            <Route path = {'/login'} component = { LoginPage } />
            <Route path = {'/signin'} component = { SignInPage } />
            <Route path = {'/mixed'} component = { MixedTestPage } />
            <Route path = {'/cabinet'} component = { CabinetPage } />

            <Route path = {'/training'} render = {(history) => {
              return(
                <SpellingPage {...history} />
              )
            }} />

            <Route path = {'/byword'} render = {(history) => {
              return (
                <TestWordPage {...history} />
              )
            }} />

            <Route path = {'/result'} render = {(history) => {
              return (
                <ResultPage {...history} />
              )
            }} />

            <Route path = {'/wordset/:setName'} render = {(history) => {
              return (
                <SelectingWordsPage {...history} />
              )
            }} />
          </BrowserRouter>
        </AuthContext.Provider>
      
  );
}

export default App;
