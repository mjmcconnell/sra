import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: '#FFF'
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Navigation(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Home
          </Typography>
          <Typography variant="title" color="inherit" className={classes.flex}>
            About
          </Typography>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Gallery
          </Typography>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Events
          </Typography>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Workshops
          </Typography>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Stockists
          </Typography>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Contact
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);