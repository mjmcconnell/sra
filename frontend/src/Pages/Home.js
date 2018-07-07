import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Template from "./Template";
import HomepageGrid from "../components/HomepageGrid";

const styles = {
  heroImage: {
    width: '100%',
    minHeight: '600px',
    backgroundImage: 'url(hero.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '100%',
    display: 'flex'
  }
};

const Home = props => {
  const { classes } = props;
  return (
    <Template
      hero={<span className={classes.heroImage}></span>}
      body={<HomepageGrid />}
    ></Template>
  );
};

export default withStyles(styles)(Home);
