import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Template from "./Template";

const styles = {};

const Workshop = props => {
  return (
    <Template
      body={<h1>Workshop</h1>}
    ></Template>
  );
};

export default withStyles(styles)(Workshop);
