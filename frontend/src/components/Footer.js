import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {flexGrow: 1},
  listItem: {textAlign: 'center'},
});


class Footer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24} className={classes.root}>
        <Grid item xs={3}>
          <List component="nav">
            <ListItem className={classes.listItem}>
              <ListItemText className="primary-title" primary="Say Hello" />
            </ListItem>
            <ListItem component="a" href="#" dense>
              <ListItemText primary="Item 1" />
            </ListItem>
            <ListItem component="a" href="#" dense>
              <ListItemText primary="Item 2" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List component="nav">
            <ListItem className={classes.listItem}>
              <ListItemText className="primary-title" primary="Meet Me" />
            </ListItem>
            <ListItem dense>
              <ListItemText primary="Project 24, Queens Paraded, Bangor" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List component="nav">
            <ListItem className={classes.listItem}>
              <ListItemText className="primary-title" primary="Follow Me" />
            </ListItem>
            <ListItem component="a" href="https://www.facebook.com/sharonreganart/" dense>
              <ListItemText primary="FB" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List component="nav">
            <ListItem className={classes.listItem}>
              <ListItemText className="primary-title" primary="Find me" />
            </ListItem>
            <ListItem component="a" href="#" dense>
              <ListItemText primary="Item 1" />
            </ListItem>
            <ListItem component="a" href="#" dense>
              <ListItemText primary="Item 2" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
