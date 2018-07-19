import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const styles = {
  root: {flexGrow: 1},
  logoImg: {width: 50, padding: '0 10px 0 10px'},
  toolbar: {minHeight: 50, borderBottom: '1px solid #AAA'},
  logoText: {flexGrow: 1},
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
          <Hidden mdUp>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Header);
