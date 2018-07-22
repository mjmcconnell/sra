import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Template from "./Template";
import WorkshopGrid from "../components/WorkshopGrid";

const styles = {};

const Workshop = props => {
  return (
    <Template
      body={<WorkshopGrid />}
    ></Template>
  );
};

export default withStyles(styles)(Workshop);
