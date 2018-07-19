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
  },
  appBar: {
    background: '#FFF',
    borderBottom: '1px solid #AAA'
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    display: 'block',
    textAlign: 'center'
  }
};

function Navigation(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Toolbar>
          <Grid container spacing={8}>
            <Grid item xs={2}>
              <a href="/about" className={classes.link}>
                <ButtonBase focusRipple>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    About
                  </Typography>
                </ButtonBase>
              </a>
            </Grid>
            <Grid item xs={2}>
              <a href="/gallery" className={classes.link}>
                <ButtonBase focusRipple>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    Gallery
                  </Typography>
                </ButtonBase>
              </a>
            </Grid>
            <Grid item xs={2}>
              <a href="/events" className={classes.link}>
                <ButtonBase focusRipple>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    Events
                  </Typography>
                </ButtonBase>
              </a>
            </Grid>
            <Grid item xs={2}>
              <a href="/workshops" className={classes.link}>
                <ButtonBase focusRipple>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    Workshops
                  </Typography>
                </ButtonBase>
              </a>
            </Grid>
            <Grid item xs={2}>
              <a href="/stockists" className={classes.link}>
                <ButtonBase focusRipple>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    Stockists
                  </Typography>
                </ButtonBase>
              </a>
            </Grid>
            <Grid item xs={2}>
              <a href="/contact" className={classes.link}>
                <ButtonBase focusRipple>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    Contact
                  </Typography>
                </ButtonBase>
              </a>
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
