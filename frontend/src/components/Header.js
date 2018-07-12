import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const styles = {
  root: {flexGrow: 1},
  logoImg: {width: 50, padding: '0 10px 0 10px'},
  toolbar: {minHeight: 50},
  logoText: {float: 'right'}
};


function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar className={classes.toolbar} disableGutters={true}>
          <img className={classes.logoImg} src="logo.png" alt="logo"/>
          <Typography className={classes.logoText} variant="title" color="inherit">
            Sharon Regan Art
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Header);
