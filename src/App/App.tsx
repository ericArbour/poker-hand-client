import React, { useContext, useState, useEffect } from "react";
import { Router, Link } from "@reach/router";
import ConnectionContext from "../contexts/ConnectionContext";
import Route from "../Route/Route";
import Home from "../Home/Home";
import Lobby from "../Lobby/Lobby";

export default () => {
  const [isConnected, setIsConnected] = useState(false);
  const [hasError, setHasError] = useState(false);
  const connection = useContext(ConnectionContext);

  useEffect(() => {
    connection
      .start()
      .then(() => setIsConnected(true))
      .catch(err => {
        setHasError(true);
      });
    return function cleanup() {
      connection.stop();
    };
  }, [connection]);

  if (hasError) {
    return <p>Error connecting to server</p>;
  } else if (!isConnected) {
    return <p>Connecting...</p>;
  } else {
    return (
      <div>
        <h1>Poker</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="lobby">Table Lobby</Link>
        </nav>
        <Router>
          <Route path="/" component={Home} />
          <Route path="lobby" component={Lobby} />
        </Router>
      </div>
    );
  }
};
