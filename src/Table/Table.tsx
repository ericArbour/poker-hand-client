import React from "react";
import Game from "../Game/Game";
import { ITable } from "../shared/types/interfaces";

type Props = {
  table: ITable | null;
};

export default ({ table }: Props) => {
  if (!table) {
    return <p>Return to lobby to select a table.</p>;
  }

  return (
    <div>
      <h2>Table</h2>
      <p>Table Name: {table.name}</p>
      <p>Players:</p>
      <ul>
        {table.players.map(player => (
          <li key={player.id}>{player.id}</li>
        ))}
      </ul>
      <p>Game Status: {table.isPlaying ? "Playing" : "Waiting to start"}</p>
      {table.isPlaying ? <Game tableId={table.id} /> : null}
    </div>
  );
};
