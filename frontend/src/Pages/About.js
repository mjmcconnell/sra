import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Template from "./Template";
import AboutGrid from "../components/AboutGrid";

const styles = {};

const About = props => {
  return (
    <Template
      body={<AboutGrid />}
    ></Template>
  );
};

export default withStyles(styles)(About);
