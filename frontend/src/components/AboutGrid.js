import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import aboutData from '../data/aboutData';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '10px 8px',
    maxWidth: '800px',
    margin: '0 auto 20px'
  },
  grid: { padding: '0 15px'},
  description: {margin: '10px 0'},
  divider: {margin: '30px 0'},
});

class AboutGrid extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {aboutData.map((tileData,i,a) => (
          <div key={tileData.title}>
            <Grid container spacing={24} className={classes.grid}>
              <Grid item xs={12}>
                <h1>{tileData.title}</h1>
                {tileData.content.map((paragraph, i) => (
                  <p key={i} className={classes.description}>{paragraph}</p>
                ))}
              </Grid>
            </Grid>
          </div>
        ))}
      </div>
    );
  }
}

AboutGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutGrid);
