// Wrapper component for reach/router typescript compatibility
// https://github.com/reach/router/issues/141

import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "@reach/router";

type Props = { component: FunctionComponent } & RouteComponentProps;

const Route: FunctionComponent<Props> = ({ component: Component, ...rest }) => (
  <Component {...rest} />
);

export default Route;
