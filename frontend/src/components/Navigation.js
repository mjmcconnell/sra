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
    marginBottom: '30px'
  },
  appBar: {
    background: '#FFF',
    borderBottom: '1px solid #AAA'
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
    padding: '20px 0',
    '&:hover': {
      background: '#EEE'
    }
  },
  link: {
    textDecoration: 'none',
    color: '#000',
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
                <a href="/workshops" className={classes.link}>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    Workshops
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
            <Grid item xs={2} className={classes.gridItem}>
              <ButtonBase disableRipple className={classes.button}>
                <a href="/contact" className={classes.link}>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    Contact
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
