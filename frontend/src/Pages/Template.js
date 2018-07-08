import React from "react";
import Grid from '@material-ui/core/Grid';

import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

class Template extends React.Component {
  render() {
    return (
      <div>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
            {this.props.hero}
        </Grid>
        {this.props.displayNavigation ?
        <Grid item xs={12}>
          <Navigation />
        </Grid>
        : ''}
        <Grid item xs={12}>
            {this.props.body}
        </Grid>
        <Grid item xs={12}>
            <Footer />
        </Grid>
      </div>
    );
  }
};

Template.defaultProps = {
    displayNavigation: true
}

export default Template;
