import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import workshopData from '../data/workshopData';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: '10px 23px 30px',
  },
});


class Video extends React.Component {
  iframe = (url) => {
    const htmlIframe = `
      <iframe
        src=` + url + `
        width="340"
        height="260"
        scrolling="no"
        frameBorder="0"
        allowTransparency="true"
        allowFullScreen="true"
      ></iframe>
    `
    return {
      __html: htmlIframe
    }
  }

  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={ this.iframe(this.props.url) } />
      </div>
    );
  }
};


function WorkshopGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        {workshopData.map(tile => (
          <Grid item xs={12} sm={6} md={4} key={tile.title}>
            <h1>{tile.title}</h1>
            <Video url={tile.url} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

WorkshopGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkshopGrid);
