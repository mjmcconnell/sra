import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import galleryData from '../data/galleryData';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  galleryGrid: {
    padding: '12px'
  },
  smTile: {},
  smTileImg: {maxWidth: '100%', maxHeight: '100%'},
  lrgTile: {},
  lrgTileImg: {
    width: '100%'
  }
});

const gallerySmGrid = (classes, tileData) => {
  return (
    <Grid item sm={4} xs={12} className={classes.smTile}>
      <GridList className={classes.gridList} cols={2} spacing={8}>
        <GridListTile cols={2}>
          <h1>{tileData.title}</h1>
          <p>{tileData.desc}</p>
        </GridListTile>
        {tileData.images.map(image => (
          <GridListTile key={image.src} cols={1}>
            <img src={image.src} alt={image.title} className={classes.smTileImg}/>
          </GridListTile>
        ))}
      </GridList>
    </Grid>
  );
};

const galleryLgGrid = (classes, tileData) => {
  return (
    <Hidden xsDown>
      <Grid item sm={8} className={classes.lrgTile}>
        <img src={tileData.images[0].src} alt={tileData.images[0].title} className={classes.lrgTileImg}/>
      </Grid>
    </Hidden>
  );
};

class GalleryGrid extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {galleryData.map((tileData,i,a) => (
          <Grid container spacing={24} className={classes.galleryGrid} key={tileData.title}>
            {i % 2 === 0 && gallerySmGrid(classes, tileData)}
            {galleryLgGrid(classes, tileData)}
            {i % 2 === 1 && gallerySmGrid(classes, tileData)}
          </Grid>
        ))}
      </div>
    );
  }
}

GalleryGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GalleryGrid);
