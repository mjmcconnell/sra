import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import * as Pages from "./Pages";

const Routes = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Pages.Home} />
        <Route path="/about" exact component={Pages.About} />
        <Route component={Pages.NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
