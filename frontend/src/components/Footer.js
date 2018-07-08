import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  footerTitle: {
    fontWeight: 'bold',
  },
});


class Footer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={3}>
          <List component="nav">
            <ListItem>
              <ListItemText className={classes.footerTitle} primary="Say Hello" />
            </ListItem>
            <ListItem component="a" href="#">
              <ListItemText primary="Item 1" />
            </ListItem>
            <ListItem component="a" href="#">
              <ListItemText primary="Item 2" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List component="nav">
            <ListItem>
              <ListItemText className={classes.footerTitle} primary="Meet Me" />
            </ListItem>
            <ListItem component="a" href="#">
              <ListItemText primary="Project 24, Queens Paraded, Bangor" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List component="nav">
            <ListItem>
              <ListItemText className={classes.footerTitle} primary="Follow Me" />
            </ListItem>
            <ListItem component="a" href="https://www.facebook.com/sharonreganart/">
              <ListItemText primary="FB" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List component="nav">
            <ListItem>
              <ListItemText className={classes.FooterTitle} primary="Find me" />
            </ListItem>
            <ListItem component="a" href="#">
              <ListItemText primary="Item 1" />
            </ListItem>
            <ListItem component="a" href="#">
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
