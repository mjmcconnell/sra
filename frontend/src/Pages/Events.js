import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Template from "./Template";

const styles = {};

const Events = props => {
  return (
    <Template
      body={<h1>Events</h1>}
    ></Template>
  );
};

export default withStyles(styles)(Events);
