import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlaceIcon from '@material-ui/icons/Place';

import eventData from '../data/eventData';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: '0 8px'
  },
  eventGrid: {
    padding: '12px',
    marginBottom: '18px'
  },
  lrgTile: {},
  lrgTileImg: {maxWidth: '100%', maxHeight: '400px'},
  gridList: {padding: '10px 0'},
  contentContainer: {padding: '0 20px 10px !important'},
  contentContainerTitle: {marginTop: 0},
  contentContainerDesc: {},
  contentContainerDetails: {
    bottom: '0',
    position: 'absolute'
  },
  contentContainerDateTime: {padding: '10px 0'},
  contentContainerLocation: {padding: '10px 0'},
  contentContainerDivider: {margin: '10px 0'}
});

class EventGrid extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {eventData.map((tileData,i,a) => (
          <div key={tileData.title}>
            <GridList className={classes.gridList} cols={2} cellHeight={400} spacing={4} >
              <GridListTile cols={1}>
                <img src={tileData.image.src} alt={tileData.image.title} className={classes.lrgTileImg}/>
              </GridListTile>
              <GridListTile cols={1} className={classes.contentContainer}>
                <h1 className={classes.contentContainerTitle}>{tileData.title}</h1>
                <p className={classes.contentContainerDesc}>{tileData.desc}</p>
                <List component="nav" className={classes.contentContainerDetails}>
                  <ListItem className={classes.contentContainerLocation}>
                    <ListItemIcon>
                      <PlaceIcon />
                    </ListItemIcon>
                    <ListItemText primary={tileData.location} />
                  </ListItem>
                  <ListItem className={classes.contentContainerDateTime}>
                    <ListItemIcon>
                      <DateRangeIcon />
                    </ListItemIcon>
                    <ListItemText primary={tileData.date} />
                    <ListItemIcon>
                      <AccessTimeIcon />
                    </ListItemIcon>
                    <ListItemText primary={tileData.time} />
                  </ListItem>
                </List>
              </GridListTile>
            </GridList>
            <Divider className={classes.contentContainerDivider} />
          </div>
        ))}
      </div>
    );
  }
}

EventGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventGrid);
