import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

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
    maxWidth: '100%'
  }
});

const tileData = [
  {
    img: 'fox1.jpg',
    tilte: 'fox1.jpg'
  },
  {
    img: 'fox2.jpg',
    tilte: 'fox2.jpg'
  },
  {
    img: 'fox3.jpg',
    tilte: 'fox3.jpg'
  },
  {
    img: 'fox4.jpg',
    tilte: 'fox4.jpg'
  },
  {
    img: 'fox5.jpg',
    tilte: 'fox5.jpg'
  },
];

class GalleryGrid extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} className={classes.galleryGrid} spacing={8}>
          <Grid item sm={4} xs={12} className={classes.smTile}>
            <GridList className={classes.gridList} cols={2} spacing={8}>
              <GridListTile cols={2}>
                <h1>What's That fox</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                  Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                  Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
                  Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
                  Vestibulum lacinia arcu eget nulla.
                </p>
              </GridListTile>
              {tileData.map(tile => (
                <GridListTile key={tile.img} cols={1}>
                  <img src={tile.img} alt={tile.title} className={classes.smTileImg}/>
                </GridListTile>
              ))}
            </GridList>
          </Grid>
          <Hidden xsDown>
            <Grid item sm={8} className={classes.lrgTile}>
              <img src="fox3.jpg" alt="fox3.jpg" className={classes.lrgTileImg}/>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  }
}

GalleryGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GalleryGrid);
