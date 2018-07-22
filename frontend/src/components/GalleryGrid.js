import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
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
    backgroundColor: theme.palette.background.paper,
    padding: '10px 23px 30px',
  },
  galleryGrid: {
    padding: '0 12px',
  },
  smTileDetails: {
    height: '47px !important',
    padding: '0 8px !important'
  },
  smTile: {cursor: 'pointer'},
  lrgTileImg: {width: '100%'},
  gridListTitle: {marginTop: 0},
  contentContainerDivider: {margin: '30px 0'}
});

const gallerySmGrid = (classes, tileData, updateMainImage) => {
  return (
    <Grid item sm={4} xs={12}>
      <GridList cols={2} spacing={16}>
        <GridListTile cols={2} className={classes.smTileDetails}>
          <h1 className={classes.gridListTitle}>{tileData.title}</h1>
        </GridListTile>
        {tileData.images.map(image => (
          <GridListTile key={image.src} cols={1} onClick={() => updateMainImage(image)} className={classes.smTile}>
            <img src={image.src} alt={image.title}/>
          </GridListTile>
        ))}
      </GridList>
    </Grid>
  );
};

const galleryLgGrid = (classes, activeImage) => {
  return (
    <Hidden xsDown>
      <Grid item sm={8}>
        <img src={activeImage.src} alt={activeImage.title} className={classes.lrgTileImg}/>
      </Grid>
    </Hidden>
  );
};

class AlbumGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tile: this.props.tile,
      activeImage: this.props.tile.images[0]
    };
  }

  updateMainImage = (image) => {
    this.setState({activeImage: image});
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={16} className={classes.galleryGrid} key={this.state.tile.title}>
        {this.props.i % 2 === 0 && gallerySmGrid(classes, this.state.tile, this.updateMainImage)}
        {galleryLgGrid(classes, this.state.activeImage)}
        {this.props.i % 2 === 1 && gallerySmGrid(classes, this.state.tile, this.updateMainImage)}
      </Grid>
    );
  }
}

class GalleryGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: galleryData,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.state.tiles.map((tile,i,a) => (
          <div key={i}>
            <AlbumGrid tile={tile} i={i} classes={classes}/>
            <Divider className={classes.contentContainerDivider} />
          </div>
        ))}
      </div>
    );
  }
}

GalleryGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GalleryGrid);
