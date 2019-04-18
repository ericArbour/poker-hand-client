import React, { useContext, useState, useEffect } from "react";
import ConnectionContext from "../contexts/ConnectionContext";
import { ITable } from "../shared/types/interfaces";

export default () => {
  const connection = useContext(ConnectionContext);
  const [tables, setTables] = useState<ITable[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    connection.on("ResponseTables", fetchedTables => {
      setTables(fetchedTables);
    });
    connection.invoke("RequestTables").catch(err => setHasError(true));
    return function cleanup() {
      connection.off("ResponseTables");
    };
  }, []);

  if (hasError) {
    return <p>Error retrieving tables</p>;
  }

  return (
    <div>
      <h2>Table Lobby</h2>
      <ul>
        {tables.map(table => (
          <li key={table.id}>
            <p>Table Name: {table.name}</p>
            <p>Number of Players: {table.playerCount}</p>
            <p>
              Game Status: {table.isPlaying ? "Playing" : "Waiting to Start"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
