import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import workshopData from '../data/workshopData';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: '4px 23px 30px',
  },
  title: {
    marginTop: 0
  },
  bannerImage: {
    margin: '0 auto 10px'
  }
});


class BannerVideo extends React.Component {
  iframe = (width, height) => {
    const htmlIframe = `
      <iframe
        src=https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fsharonreganart%2Fvideos%2F700281047017181%2F
        width="` + width + `"
        height="` + height + `"
        scrolling="no"
        frameborder="0"
        allowTransparency="true"
        allowFullScreen="true"
        style="border:none;overflow:hidden"
      ></iframe>
    `
    return {
      __html: htmlIframe
    }
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={ this.iframe(this.props.width, this.props.height) } />
    );
  }
};

class Video extends React.Component {
  iframe = (url) => {
    const htmlIframe = `
      <iframe
        src=` + url + `
        width="340"
        height="260"
        scrolling="no"
        frameborder="0"
        allowTransparency="true"
        allowFullScreen="true"
        style="border:none;overflow:hidden"
      ></iframe>
    `
    return {
      __html: htmlIframe
    }
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={ this.iframe(this.props.url) } />
    );
  }
};
function WorkshopGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.bannerImage}>
        <Hidden smDown>
          <BannerVideo width={800} height={600}/>
        </Hidden>
        <Hidden mdUp>
          <BannerVideo width={560} height={420}/>
        </Hidden>
      </div>
      <Grid container spacing={24}>
        {workshopData.map(tile => (
          <Grid item xs={12} sm={6} lg={4} key={tile.title}>
            <h1 className={classes.title}>{tile.title}</h1>
            <Video url={tile.url} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

WorkshopGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkshopGrid);
