import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Template from "./Template";

const styles = {};

const Stockists = props => {
  return (
    <Template
      body={<h1>Stockists</h1>}
    ></Template>
  );
};

export default withStyles(styles)(Stockists);
