import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
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
    padding: '10px 23px 30px',
  },
  eventGrid: { padding: '0 15px'},
  eventImage: {width: '100%'},
  gridList: {
    maxHeight: '550px',
    overflow: 'hidden'
  },
  contentContainerTitle: {marginTop: 0},
  contentContainerDesc: {margin: '10px 0'},
  contentContainerDetails: {},
  contentContainerLocation: {padding: '4px 0'},
  contentContainerDateTime: {padding: '4px 0'},
  contentContainerDivider: {margin: '30px 0'},
  actionLink: {textDecoration: 'none'}
});

class EventGrid extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {eventData.map((tileData,i,a) => (
          <div key={tileData.title}>
            <Grid container spacing={24} className={classes.eventGrid}>
              <Grid item xs={12} sm={6} className={classes.gridList}>
                <img src={tileData.image.src} alt={tileData.image.title} className={classes.eventImage}/>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.gridList}>
                <h1 className={classes.contentContainerTitle} >{tileData.title}</h1>
                {tileData.desc.map((paragraph, i) => (
                  <p key={i} className={classes.contentContainerDesc}>{paragraph}</p>
                ))}
                <List component="nav" className={classes.contentContainerDetails}>
                  {
                    tileData.location &&
                    <ListItem className={classes.contentContainerLocation}>
                      <ListItemIcon>
                        <PlaceIcon />
                      </ListItemIcon>
                      <a href={tileData.locationLink} target="_blank">
                        <ListItemText primary={tileData.location}/>
                      </a>
                    </ListItem>
                  }
                  {
                    tileData.date &&
                    <ListItem className={classes.contentContainerDateTime}>
                      <ListItemIcon>
                        <DateRangeIcon />
                      </ListItemIcon>
                      <ListItemText primary={tileData.date} />
                    </ListItem>
                  }
                  {
                    tileData.time &&
                    <ListItem className={classes.contentContainerDateTime}>
                      <ListItemIcon>
                        <AccessTimeIcon />
                      </ListItemIcon>
                      <ListItemText primary={tileData.time} />
                    </ListItem>
                  }
                  <ListItem className={classes.contentContainerDateTime}>
                    <a href={tileData.actionLink} target={tileData.actionLinkTarget} className={classes.actionLink}>
                      <Button variant="contained" color="secondary" className={classes.button}>
                        {tileData.actionLabel}
                      </Button>
                    </a>
                  </ListItem>
                  {
                    tileData.secondardActionLink &&
                    <ListItem className={classes.contentContainerDateTime}>
                    <a href={tileData.secondardActionLink} target={tileData.secondardActionLinkTarget} className={classes.actionLink}>
                      <Button variant="contained" color="secondary" className={classes.button}>
                        {tileData.secondardActionLinkLabel}
                      </Button>
                    </a>
                  </ListItem>
                  }

                </List>
              </Grid>
            </Grid>
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
