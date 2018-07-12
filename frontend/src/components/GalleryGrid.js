import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({});

class GalleryGrid extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      </div>
    );
  }
}

GalleryGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GalleryGrid);
