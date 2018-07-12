import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Template from "./Template";
import HomepageGrid from "../components/HomepageGrid";

const styles = {};

const Home = props => {
  return (
    <Template
      body={<HomepageGrid />}
      displayNavigation={false}
    ></Template>
  );
};

export default withStyles(styles)(Home);
