import React, { useContext, useState, useEffect, useCallback } from "react";
import { navigate } from "@reach/router";
import ConnectionContext from "../contexts/ConnectionContext";
import { ITable } from "../shared/types/interfaces";

type Props = {
  setTable: React.Dispatch<React.SetStateAction<ITable | null>>;
};

export default ({ setTable }: Props) => {
  const connection = useContext(ConnectionContext);
  const [tables, setTables] = useState<ITable[]>([]);
  const [error, setError] = useState("");
  const [isJoiningTable, setIsJoiningTable] = useState(false);

  const handleJoin = useCallback((tableId: string) => {
    setIsJoiningTable(true);
    connection.invoke("JoinTable", tableId).catch(() => {
      setError("Sorry, unable to join this game. Please try again.");
      setIsJoiningTable(false);
    });
  }, []);

  useEffect(() => {
    connection.on("PostTables", fetchedTables => {
      setTables(fetchedTables);
    });
    connection.on("JoinedTable", (table: ITable) => {
      setIsJoiningTable(false);
      setTable(table);
      navigate("/table");
    });
    connection
      .invoke("GetTables")
      .catch(err => setError("Error retrieving tables."));
    return function cleanup() {
      connection.off("PostTables");
      connection.off("JoinedTable");
    };
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (isJoiningTable) {
    return <p>Joining table...</p>;
  }

  return (
    <div>
      <h2>Table Lobby</h2>
      <ul>
        {tables.map(table => (
          <li key={table.id}>
            <p>Table Name: {table.name}</p>
            <p>Number of Players: {table.players.length}</p>
            <p>
              Game Status: {table.isPlaying ? "Playing" : "Waiting to start"}
            </p>
            <button onClick={() => handleJoin(table.id)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
