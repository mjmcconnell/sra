import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
  },
  gridListEtsyTile: {
    background: 'purple',
    width: '100%',
    display: 'flex',
    height: '100%',
  },
  gridListContactTile: {
    background: 'pink',
    width: '100%',
    display: 'flex',
    height: '100%',
  },
  gridListProjectsTile: {
    background: 'green',
    width: '100%',
    display: 'flex',
    height: '100%',
  },
  gridListEtsyTileTitle: {
    color: '#FFF'
  },
  image: {
    position: 'relative',
    height: 600,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.1,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.35,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
});

const tiles = [
  {
    rows: 1,
    cols: 2,
    image: 'grass_field.png',
    title: 'Etsy Shop',
  },
  {
    rows: 2,
    cols: 1,
    image: 'blue_leaf.jpg',
    title: 'About',
  },
  {
    rows: 2,
    cols: 1,
    image: 'sra_workshop.jpg',
    title: 'Workshops',
  },
  {
    rows: 2,
    cols: 1,
    image: 'hares.jpg',
    title: 'Events',
  },
  {
    rows: 2,
    cols: 1,
    image: 'map.png',
    title: 'Stockists',
  },
]

class HomepageGrid extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridList spacing={4} cellHeight={160} className={classes.gridList} cols={2} container={true}>
          {tiles.map(tile => (
            <GridListTile cols={tile.cols} rows={tile.rows} key={tile.title}>
              <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: '100%',
                  height: `${tile.rows * 160}px`,
                }}
              >
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${tile.image})`,
                  }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                  <Typography
                    component="span"
                    variant="subheading"
                    color="inherit"
                    className={classes.imageTitle}
                  >
                    {tile.title}
                  </Typography>
                </span>
              </ButtonBase>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

HomepageGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomepageGrid);
