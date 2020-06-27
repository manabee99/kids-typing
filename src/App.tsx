import React from "react";
import PracticePageContainer from "./containers/PracticePageContainer";
import TitlePageContainer from "./containers/TitlePageContainer";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = (props) => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>

          {/* タイトルページ（練習後に戻った時）*/}
          <Route
            path="/kids-typing/title/:soundMuting"
            component={TitlePageContainer}
          ></Route>

          {/* 練習ページ */}
          <Route
            path="/kids-typing/practice"
            component={PracticePageContainer}
          ></Route>

        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;

