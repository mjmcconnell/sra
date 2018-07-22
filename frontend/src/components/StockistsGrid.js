import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';

import stockistsData from '../data/stockistsData';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: '10px 23px 30px',
  },
  gridListTile: {
    border: '1px solid #DDD',
    padding: '0 !important'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  img: {
    width: '100%'
  }
});

function StockistsGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        {stockistsData.map(tile => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={tile.name}>
              <GridList cellHeight={320} cols={1}>
                <GridListTile className={classes.gridListTile}>
                  <a href={tile.link} target="_blank">
                    <img src={tile.image} alt={tile.name} className={classes.img}/>
                  </a>
                  <GridListTileBar
                    title={tile.name}
                    subtitle={tile.address}
                    actionIcon={
                      <a href={tile.mapLink} target="_blank">
                        <IconButton className={classes.icon}>
                          <PlaceIcon />
                        </IconButton>
                      </a>
                    }
                  />
                </GridListTile>
              </GridList>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

StockistsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StockistsGrid);
