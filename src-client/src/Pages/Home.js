import React from "react";

import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import NavBar from "../components/NavBar";
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
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <span className={classes.heroImage}></span>
        </Grid>
        <NavBar />
        <Grid item xs={12}>
            <HomepageGrid />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Home);
