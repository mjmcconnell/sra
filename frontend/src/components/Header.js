import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const styles = {
  root: {flexGrow: 1},
  logoImg: {width: 50, padding: '0 10px 0 10px'},
  toolbar: {minHeight: 60, borderBottom: '1px solid #000'},
  logoText: {flexGrow: 1},
  hpLink: {
    display: 'contents',
    textDecoration: 'none',
    color: '#000'
  },
  link: {
    textDecoration: 'none',
    '&:focus': {
      outline: 'none'
    }
  }
};

class Header extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar className={classes.toolbar} disableGutters={true}>
            <a href="/" className={classes.hpLink}>
              <img className={classes.logoImg} src="logo.png" alt="logo"/>
              <Typography className={classes.logoText} variant="title" color="inherit">
                Sharon Regan Art
              </Typography>
            </a>
            <Hidden mdUp>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <a href="/" className={classes.link}><MenuItem>Home</MenuItem></a>
                <a href="/about" className={classes.link}><MenuItem>About</MenuItem></a>
                <a href="/gallery" className={classes.link}><MenuItem>Gallery</MenuItem></a>
                <a href="/events" className={classes.link}><MenuItem>Events</MenuItem></a>
                <a href="/workshops" className={classes.link}><MenuItem>Workshops</MenuItem></a>
                <a href="/stockists" className={classes.link}><MenuItem>Stockists</MenuItem></a>
              </Menu>
            </Hidden>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Header);
