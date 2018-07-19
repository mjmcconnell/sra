import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Template from "./Template";
import EventGrid from "../components/EventGrid";

const styles = {};

const Events = props => {
  return (
    <Template
      body={<EventGrid />}
    ></Template>
  );
};

export default withStyles(styles)(Events);
