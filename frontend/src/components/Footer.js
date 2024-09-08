import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = theme => ({
  root: {flexGrow: 1},
  listItem: {textAlign: 'center'},
  avatar: {borderRadius: 0, padding: 10, margin: '-10px'},
  blurb: {paddingLeft: 20}
});


class FooterHelloGrid extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={this.props.width}>
        <List component="nav">
          <ListItem className={classes.listItem}>
            <ListItemText className="primary-title" primary="Say Hello" />
          </ListItem>
          <div className={classes.blurb}>
            <p>A graduate of the University of Ulster with a BA Contemporary Applied Art</p>
            <p>Based in the seaside town of Donaghadee</p>
            <p>Artist/sculptor working in various mediums including painting both small scale and large street art, ceramic sculpture, fused glass, architectural restoration.</p>
            <p>Workshops and classes offered to small groups and large organisations. Community Art Projects  undertaken</p>
            <p>Commissions undertaken</p>
            <p><a href="mailto:sharonreganart@gmail.com">sharonreganart@gmail.com</a></p>
          </div>
        </List>
      </Grid>
    );
  }
}


class FooterFollowGrid extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={this.props.width}>
        <List component="nav">
          <ListItem className={classes.listItem}>
            <ListItemText className="primary-title" primary="Follow Me" />
          </ListItem>
          <ListItem component="a" href="https://www.facebook.com/sharonreganart/" dense>
            <Avatar className={classes.avatar} alt="Facebook" src="/images/facebook.png" />
            <ListItemText primary="sharonreganart" />
          </ListItem>
          <ListItem component="a" href="https://www.instagram.com/sharonreganart/" dense>
            <Avatar className={classes.avatar} alt="Instagram" src="/images/instagram.jpeg" />
            <ListItemText primary="sharonreganart" />
          </ListItem>
        </List>
      </Grid>
    );
  }
}


class FooterMemberGrid extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={this.props.width}>
        <List component="nav">
          <ListItem className={classes.listItem}>
            <ListItemText className="primary-title" primary="Member Of" />
          </ListItem>
          <ListItem component="a" href="http://www.craftni.org" dense>
            <Avatar className={classes.avatar} alt="Craft NI" src="/images/craft_ni.jpg" />
            <ListItemText primary="Craft NI" />
          </ListItem>
          <ListItem component="a" href="https://www.dccoi.ie" dense>
            <Avatar className={classes.avatar} alt="Design & Crafts Council Ireland" src="/images/design_council.jpg" />
            <ListItemText primary="Design & Crafts Council Ireland" />
          </ListItem>
          <ListItem component="a" href="https://visualartists.ie" dense>
            <Avatar className={classes.avatar} alt="Visual Artists Ireland" src="/images/visual_artists.jpg" />
            <ListItemText primary="Visual Artists Ireland" />
          </ListItem>
          <ListItem component="a" href="https://sculptors.org.uk" dense>
            <Avatar className={classes.avatar} alt="Royal British Society of Sculptors" src="/images/rbslogo.jpg" />
            <ListItemText primary="Royal British Society of Sculptors" />
          </ListItem>
        </List>
      </Grid>
    );
  }
}


class Footer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Hidden xsDown>
          <Grid container spacing={24} className={classes.root}>
            <FooterHelloGrid classes={classes} width={6} />
            <FooterFollowGrid classes={classes} width={3} />
            <FooterMemberGrid classes={classes} width={3} />
          </Grid>
        </Hidden>
        <Hidden smUp>
          <Grid container spacing={24} className={classes.root} direction="column">
            <FooterHelloGrid classes={classes} width={24} />
            <FooterFollowGrid classes={classes} width={12} />
            <FooterMemberGrid classes={classes} width={12} />
          </Grid>
        </Hidden>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
