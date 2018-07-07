import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


function Footer(props) {
  return (
    <Grid container spacing={24}>
      <Grid item xs={3}>
        <List component="nav">
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

export default Footer;
