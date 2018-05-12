import React from "react";

import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import { withStyles } from "material-ui/styles";

import NavBar from "../components/NavBar";

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
      <NavBar />
      <Grid container spacing={24}>
        <Grid item xs={12} sm={9} md={10}>
          <h1>About Page</h1>
        </Grid>
        <Hidden xsDown>
          <Grid item xs={3} md={2}>
            <span>Side bar</span>
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Home);
