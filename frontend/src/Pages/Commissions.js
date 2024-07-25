import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Template from "./Template";
import CommissionsGrid from "../components/CommissionsGrid";

const styles = {};

const Commissions = props => {
  return (
    <Template
      body={<CommissionsGrid />}
    ></Template>
  );
};

export default withStyles(styles)(Commissions);
