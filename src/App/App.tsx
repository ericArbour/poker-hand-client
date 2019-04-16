import React, { useContext, useState, useEffect } from "react";
import ConnectionContext from "../contexts/ConnectionContext";

export default () => {
  const [isConnected, setIsConnected] = useState(false);
  const [hasError, setHasError] = useState(false);
  const connection = useContext(ConnectionContext);

  useEffect(() => {
    connection
      .start()
      .then(() => setIsConnected(true))
      .catch(err => {
        console.error(err.message);
        setHasError(true);
      });
    return function cleanup() {
      connection.stop();
    };
  }, [connection]);

  if (!isConnected) {
    return <p>Connecting...</p>;
  } else if (hasError) {
    return <p>Error connecting to server</p>;
  } else {
    return <div>Connected</div>;
  }
};
