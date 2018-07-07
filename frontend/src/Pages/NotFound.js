import React from "react";
import { withRouter } from "react-router-dom";

import Template from "./Template";

const NotFound = withRouter(props => {
  const { location } = props;

  return (
    <div>
      <h1>404 - Not Found</h1>
      <h2>The page '{location.pathname}' was not found on this site.</h2>
    </div>
  );
});

const NotFoundPage = props => {
  return (
    <Template
      body={<NotFound />}
    ></Template>
  );
};

export default NotFoundPage;
