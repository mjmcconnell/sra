import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Template from "./Template";
import GalleryGrid from "../components/GalleryGrid";

const styles = {};

const Gallery = props => {
  return (
    <Template
      body={<GalleryGrid />}
    ></Template>
  );
};

export default withStyles(styles)(Gallery);
