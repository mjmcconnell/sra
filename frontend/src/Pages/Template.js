import React from "react";
import Grid from '@material-ui/core/Grid';

import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Template = props => {
  return (
    <div>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
          {props.hero}
      </Grid>
      <Grid item xs={12}>
        <Navigation />
      </Grid>
      <Grid item xs={12}>
          {props.body}
      </Grid>
      <Grid item xs={12}>
          <Footer />
      </Grid>
    </div>
  );
};

export default Template;
