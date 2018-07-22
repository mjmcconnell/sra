import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Template from "./Template";
import StockistsGrid from "../components/StockistsGrid";

const styles = {};

const Stockists = props => {
  return (
    <Template
      body={<StockistsGrid />}
    ></Template>
  );
};

export default withStyles(styles)(Stockists);
