import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const styles = {
  root: {maxWidth: '1600px', margin: '0 auto'},
  body: {},
};

class Template extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        {this.props.displayNavigation ?
        <Grid item xs={12}>
          <Navigation />
        </Grid>
        : ''}
        <Grid item xs={12} className={classes.body}>
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

Template.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Template);
