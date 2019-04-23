import React, { CSSProperties } from "react";
import Game from "../Game/Game";
import { ITable } from "../shared/types/interfaces";

type Props = {
  table: ITable | null;
  playerId: string | null;
};

export default ({ table, playerId }: Props) => {
  if (!table || !playerId) {
    return <p>Return to lobby to select a table.</p>;
  }

  return (
    <div>
      <h2>Table</h2>
      <p>Table Name: {table.name}</p>
      <p>Players:</p>
      <ul>
        {table.players.map(player => {
          const isCurrentPlayer = playerId === player.id;
          const style: CSSProperties = isCurrentPlayer
            ? { fontWeight: "bold" }
            : {};
          return (
            <li key={player.id} style={style}>
              Id: {player.id}, Chip Count: {player.chipCount}
            </li>
          );
        })}
      </ul>
      <p>Game Status: {table.isPlaying ? "Playing" : "Waiting to start"}</p>
      {table.isPlaying ? <Game tableId={table.id} playerId={playerId} /> : null}
    </div>
  );
};
