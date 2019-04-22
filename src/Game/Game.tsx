import React, { useContext, useEffect, useState } from "react";
import ConnectionContext from "../shared/contexts/ConnectionContext";
import { IPlayer } from "../shared/types/interfaces";

type Props = {
  tableId: string;
};

type PlayerGameState = {
  pot: number;
  players: IPlayer[];
  currentPlayer: string;
  hand: string[];
};

export default ({ tableId }: Props) => {
  const connection = useContext(ConnectionContext);
  const [
    playerGameState,
    setPlayerGameState
  ] = useState<PlayerGameState | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    connection.on("PostPlayerGameState", updatedGameState =>
      setPlayerGameState(updatedGameState)
    );

    connection
      .invoke("GetPlayerGameState", tableId)
      .catch(err => setError("Error retrieving game."));

    return function cleanup() {
      connection.off("PostPlayerGameState");
    };
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!playerGameState) {
    return <p>Loading game state...</p>;
  }

  return (
    <div>
      <h3>Game</h3>
      <p>Pot: {playerGameState.pot}</p>
      <p>Current Player Turn: {playerGameState.currentPlayer}</p>
      <p>Your Hand:</p>
      <ul>
        {playerGameState.hand.map(card => (
          <li key={card}>{card}</li>
        ))}
      </ul>
    </div>
  );
};
