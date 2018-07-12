import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
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
        opacity: 0.15,
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
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

class HomepageGrid extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridList spacing={4} cellHeight={160} className={classes.gridList} cols={2} container={true}>

          <GridListTile cols={2} rows={1}>
            <ButtonBase
              focusRipple
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: '100%',
                height: '160px',
              }}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(grass_field.png)`,
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
                  Etsy shop
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          </GridListTile>

          <GridListTile cols={1} rows={2}>
            <img src="blue_leaf.jpg" alt="about"/>
            <GridListTileBar title="About" />
          </GridListTile>
          <GridListTile cols={1} rows={2}>
            <img src="sra_workshop.jpg" alt="workshops"/>
            <GridListTileBar title="Workshops" />
          </GridListTile>

          <GridListTile cols={1} rows={2}>
            <img src="hares.jpg" alt="events"/>
            <GridListTileBar title="Events" />
          </GridListTile>
          <GridListTile cols={1} rows={2}>
            <img src="map.png" alt="stockists"/>
            <GridListTileBar title="Stockists" />
          </GridListTile>
        </GridList>
      </div>
    );
  }
}

HomepageGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomepageGrid);
