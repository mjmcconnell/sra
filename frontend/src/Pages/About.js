import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Template from "./Template";

const styles = {};

const About = props => {
  return (
    <Template
      body={<h1>About</h1>}
    ></Template>
  );
};

export default withStyles(styles)(About);
