import * as React from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';

const connection = new HubConnectionBuilder()
  .withUrl('http://192.168.1.78:5000/pokerHub')
  .build();

interface IState {
  connected: boolean;
  error: string;
  tables: object;
}

class SignalConnection extends React.Component<{}, IState> {
  public state: IState = {
    connected: false,
    error: '',
    tables: {}
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
      this.setState({ tables });
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
    console.log(this.state.tables);
    if (!this.state.connected) {
      return <div>Connecting...</div>;
    }

    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }

    return (
      <div>
        <div>Test</div>
        <button onClick={this.getTables}>Get Tables</button>
        <div>
          {Object.keys(this.state.tables).map(key => (
            <div key={key}>
              <button id={key} onClick={this.joinTable}>
                {key}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default SignalConnection;
