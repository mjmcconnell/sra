import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import * as Pages from "./Pages";

const Routes = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Pages.Home} />
        <Route path="/about" exact component={Pages.About} />
        <Route path="/gallery" exact component={Pages.Gallery} />
        <Route path="/events" exact component={Pages.Events} />
        <Route path="/commissions" exact component={Pages.Commissions} />
        <Route path="/videos" exact component={Pages.Workshop} />
        <Route component={Pages.NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
