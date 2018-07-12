import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Template from "./Template";

const styles = {};

const Contact = props => {
  return (
    <Template
      body={<h1>Contact</h1>}
    ></Template>
  );
};

export default withStyles(styles)(Contact);
