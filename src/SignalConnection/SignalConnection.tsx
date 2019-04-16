// import * as React from "react";
// import Hand from "../Hand/Hand";
// import { ITable } from "../shared/types/interfaces";

// interface IState {
//   error: string;
//   isAtTable: boolean;
//   isConnected: boolean;
//   isGamePlaying: boolean;
//   isViewingLobby: boolean;
//   tables: object;
// }

// class SignalConnection extends React.Component<{}, IState> {
//   public state: IState = {
//     error: "",
//     isAtTable: false,
//     isConnected: false,
//     isGamePlaying: false,
//     isViewingLobby: false,
//     tables: {}
//   };

//   constructor(props: any) {
//     super(props);

//     this.getTables = this.getTables.bind(this);
//     this.joinTable = this.joinTable.bind(this);
//   }

//   public componentDidMount() {
//     connection
//       .start()
//       .then(() => this.setState({ isConnected: true }))
//       .catch(err => this.setState({ error: err.toString() }));

//     connection.on("ViewTables", tables => {
//       this.setState({ tables, isViewingLobby: true });
//     });

//     connection.on("JoinedTable", (isGamePlaying: boolean) => {
//       this.setState({ isAtTable: true, isViewingLobby: false, isGamePlaying });
//     });

//     connection.on("GameStarted", (isGamePlaying: boolean) => {
//       this.setState({ isGamePlaying });
//     });
//   }

//   public getTables() {
//     if (this.state.isConnected) {
//       connection
//         .invoke("GetTables")
//         .catch(err => this.setState({ error: err.toString() }));
//     }
//   }

//   public joinTable(event: React.MouseEvent<HTMLElement>) {
//     if (this.state.isConnected) {
//       connection
//         .invoke("JoinTable", event.currentTarget.id)
//         .catch(err => this.setState({ error: err.toString() }));
//     }
//   }

//   public render() {
//     if (!this.state.isConnected) {
//       return <div>Connecting...</div>;
//     }

//     if (this.state.error) {
//       return <div>{this.state.error}</div>;
//     }

//     if (!this.state.isViewingLobby && !this.state.isAtTable) {
//       return (
//         <div>
//           <div>Welcome</div>
//           <button onClick={this.getTables}>View Available Tables</button>
//         </div>
//       );
//     }

//     if (this.state.isViewingLobby) {
//       console.log(this.state.tables);
//       const tableKeyArray: string[] = Object.keys(this.state.tables);
//       return (
//         <div>
//           Table Lobby
//           {tableKeyArray.length === 0 ? (
//             <div>No Tables Available</div>
//           ) : (
//             <div>
//               <div>Choose a table to join</div>
//               {tableKeyArray.map((key: string) => {
//                 const table: ITable = this.state.tables[key];
//                 return (
//                   <div key={table.id} style={{ border: "1px solid black" }}>
//                     <p>Name: {table.name}</p>
//                     <p>Number of Players: {table.playerCount}</p>
//                     <p>
//                       Game Status:{" "}
//                       {table.isPlaying ? "playing" : "waiting to start"}
//                     </p>
//                     <button id={table.id} onClick={this.joinTable}>
//                       Join
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       );
//     }

//     return <Hand isGamePlaying={this.state.isGamePlaying} />;
//   }
// }

// export default SignalConnection;
