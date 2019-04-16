import { createContext } from "react";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";

export default createContext<HubConnection>(
  new HubConnectionBuilder().withUrl("http://10.0.0.66:5000/pokerHub").build()
);
