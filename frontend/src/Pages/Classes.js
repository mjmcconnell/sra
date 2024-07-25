import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Template from "./Template";
import ClassGrid from "../components/ClassGrid";

const styles = {};

const Classes = props => {
  return (
    <Template
      body={<ClassGrid />}
    ></Template>
  );
};

export default withStyles(styles)(Classes);
