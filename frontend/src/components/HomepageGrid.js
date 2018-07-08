import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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
  }
});

class HomepageGrid extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridList spacing={4} cellHeight={160} className={classes.gridList} cols={2} container={true}>

          <GridListTile cols={2} rows={1}>
            <span className={classes.gridListEtsyTile}></span>
            <GridListTileBar title="Esty site" />
          </GridListTile>

          <GridListTile cols={1} rows={2}>
            <img src="mum.jpg" alt="test"/>
            <GridListTileBar title="Events" />
          </GridListTile>
          <GridListTile cols={1} rows={2}>
            <span className={classes.gridListProjectsTile}></span>
            <GridListTileBar title="Workshops" />
          </GridListTile>

          <GridListTile cols={1} rows={2}>
            <span className={classes.gridListContactTile}></span>
            <GridListTileBar title="About" />
          </GridListTile>
          <GridListTile cols={1} rows={2}>
            <img src="mum.jpg" alt="test"/>
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
