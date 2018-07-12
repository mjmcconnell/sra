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
    marginBottom: 4
  },
  gridList: {
    width: '100%'
  },
  gridListEtsyTile: {
    width: '100%',
    display: 'flex',
    height: '100%'
  },
});

class HomepageHero extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList}>

          <GridListTile cols={2} rows={4}>
            <img src="hero.jpg" alt="gallery"/>
            <GridListTileBar title="Gallery" />
          </GridListTile>

        </GridList>
      </div>
    );
  }
}

HomepageHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomepageHero);
