import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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

function NavBar(props) {
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
            Projects
          </Typography>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Etsy
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

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
