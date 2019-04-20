import React, { useContext, useState, useEffect } from "react";
import { Router, Link } from "@reach/router";
import ConnectionContext from "../contexts/ConnectionContext";
import Route from "../Route/Route";
import Home from "../Home/Home";
import Lobby from "../Lobby/Lobby";
import Table from "../Table/Table";
import { ITable } from "../shared/types/interfaces";

export default () => {
  const [isConnected, setIsConnected] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [table, setTable] = useState<ITable | null>(null);
  const connection = useContext(ConnectionContext);

  useEffect(() => {
    connection
      .start()
      .then(() => setIsConnected(true))
      .catch(err => {
        setHasError(true);
      });

    connection.on("TableUpdated", (updatedTable: ITable) =>
      setTable(updatedTable)
    );

    return function cleanup() {
      connection.off("TableUpdated");
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
          <Route path="/" render={<Home />} />
          <Route path="lobby" render={<Lobby setTable={setTable} />} />
          <Route path="table" render={<Table table={table} />} />
        </Router>
      </div>
    );
  }
};
