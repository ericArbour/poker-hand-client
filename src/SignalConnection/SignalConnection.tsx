import * as React from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';
import Table from 'shared/src/components/Table/Table';
import { ITable } from 'shared/src/types/interfaces';

const connection = new HubConnectionBuilder()
  .withUrl('http://192.168.1.78:5000/pokerHub')
  .build();

interface IState {
  connected: boolean;
  error: string;
  tableInfo: ITable | null;
  tables: object;
  viewingLobby: boolean;
}

class SignalConnection extends React.Component<{}, IState> {
  public state: IState = {
    connected: false,
    error: '',
    tableInfo: null,
    tables: {},
    viewingLobby: false
  };

  constructor(props: any) {
    super(props);

    this.getTables = this.getTables.bind(this);
    this.joinTable = this.joinTable.bind(this);
  }

  public componentDidMount() {
    connection
      .start()
      .then(() => this.setState({ connected: true }))
      .catch(err => this.setState({ error: err.toString() }));

    connection.on('ViewTables', tables => {
      this.setState({ tables, viewingLobby: true });
    });

    connection.on('TableUpdated', tableInfo => {
      this.setState({ tableInfo });
    });
  }

  public getTables() {
    if (this.state.connected) {
      connection
        .invoke('GetTables')
        .catch(err => this.setState({ error: err.toString() }));
    }
  }

  public joinTable(event: React.MouseEvent<HTMLElement>) {
    if (this.state.connected) {
      connection
        .invoke('JoinTable', event.currentTarget.id)
        .catch(err => this.setState({ error: err.toString() }));
    }
  }

  public render() {
    if (!this.state.connected) {
      return <div>Connecting...</div>;
    }

    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }

    if (!this.state.viewingLobby) {
      return (
        <div>
          <div>Welcome</div>
          <button onClick={this.getTables}>View Available Tables</button>
        </div>
      );
    }

    if (this.state.tableInfo) {
      return <Table tableInfo={this.state.tableInfo} />;
    }

    const tableKeyArray: string[] = Object.keys(this.state.tables);
    return (
      <div>
        Table Lobby
        {tableKeyArray.length === 0 ? (
          <div>No Tables Availalbe</div>
        ) : (
          <div>
            <div>Choose a table to join</div>
            {tableKeyArray.map((key: string) => {
              const table: ITable = this.state.tables[key];
              return (
                <div key={table.id}>
                  <button id={table.id} onClick={this.joinTable}>
                    {table.name}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default SignalConnection;
