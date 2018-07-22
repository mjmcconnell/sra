import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
    background: '#79d3c6',
    marginBottom: '30px',
    marginTop: '-1px',
    borderBottom: '1px solid #59b4a6',
    borderTop: '1px solid #59b4a6',
    position: 'relative'
  },
  appBar: {
    color: '#FFF',
  },
  flex: {
    flex: 1,
  },
  gridContainer: {
    height: '100%'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 15,
  },
  gridItem: {
    display: 'inline-grid'
  },
  button: {
    display: 'block',
    textAlign: 'center',
    padding: '15px 0',
    '&:hover': {
      background: '#69c4b6'
    }
  },
  link: {
    textDecoration: 'none',
    color: '#FFF',
    padding: '20px 0',
    margin: '-20px 0',
    display: 'block'
  }
};

function Navigation(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Toolbar disableGutters={true} variant="dense">
          <Grid container spacing={8} className={classes.gridContainer}>
            <Grid item xs={2} className={classes.gridItem}>
              <ButtonBase disableRipple className={classes.button}>
                <a href="/" className={classes.link}>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    Home
                  </Typography>
                </a>
              </ButtonBase>
            </Grid>
            <Grid item xs={2} className={classes.gridItem}>
              <ButtonBase disableRipple className={classes.button}>
                <a href="/about" className={classes.link}>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    About
                  </Typography>
                </a>
              </ButtonBase>
            </Grid>
            <Grid item xs={2} className={classes.gridItem}>
              <ButtonBase disableRipple className={classes.button}>
                <a href="/gallery" className={classes.link}>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    Gallery
                  </Typography>
                </a>
              </ButtonBase>
            </Grid>
            <Grid item xs={2} className={classes.gridItem}>
              <ButtonBase disableRipple className={classes.button}>
                <a href="/events" className={classes.link}>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    Events
                  </Typography>
                </a>
              </ButtonBase>
            </Grid>
            <Grid item xs={2} className={classes.gridItem}>
              <ButtonBase disableRipple className={classes.button}>
                <a href="/videos" className={classes.link}>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    Videos
                  </Typography>
                </a>
              </ButtonBase>
            </Grid>
            <Grid item xs={2} className={classes.gridItem}>
              <ButtonBase disableRipple className={classes.button}>
                <a href="/stockists" className={classes.link}>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    Stockists
                  </Typography>
                </a>
              </ButtonBase>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);
