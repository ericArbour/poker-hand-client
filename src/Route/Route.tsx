// Wrapper component for reach/router typescript compatibility
// https://github.com/reach/router/issues/141

import { FunctionComponent } from "react";
import { RouteComponentProps } from "@reach/router";

type Props = { render: JSX.Element } & RouteComponentProps;

const Route: FunctionComponent<Props> = ({ render, ...rest }) => render;

export default Route;
