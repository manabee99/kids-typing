import React from 'react';
import PracticePageContainer from './containers/PracticePageContainer';
import TitlePageContainer from './containers/TitlePageContainer';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import EndingPageContainer from './containers/EndingPageContainer';

const App: React.FC = (props) => {
  return (
    <React.Fragment>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>

          {/* kids-typingの入り口 */}
          <Route path='/' exact>
            <Redirect to='/title/true/'></Redirect>
          </Route>

          {/* タイトルページ（練習後に戻った時）*/}
          <Route path='/title/:soundMuting' exact component={TitlePageContainer}></Route>

          {/* 練習ページ */}
          <Route path='/practice/:soundMuting' exact component={PracticePageContainer}></Route>

          {/* エンディングページ */}
          <Route path='/ending/:soundMuting' exact component={EndingPageContainer}></Route>

        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
