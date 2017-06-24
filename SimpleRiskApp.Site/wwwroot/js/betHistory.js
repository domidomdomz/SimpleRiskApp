class Main extends React.Component {

    constructor() {
        super();
        
        this.state = {
            betHistory: []
        };
    }

    componentDidMount() {
        this.loadBetHistory();
    }

    loadBetHistory() {
        console.log('loadBetHistory');

        return $.getJSON('http://localhost:57006/api/bethistory')
            .then((data) => {

                console.log('data.result', data)

                this.setState({ betHistory: data });
            });
        
    }
    
    render() {

        //console.log(this.props.myData);
        
        return (
            <div style={{ padding: '15px' }}>
                <CustomerBetHistory customerBetHistoryList={this.state.betHistory} />
            </div>
        );
    }
}

class CustomerBetHistory extends React.Component {
    render() {

        //console.log(this.props.customerBetHistoryList);

        return (
            <div className="customer-bet-history">
                <ul>
                    {
                        this.props.customerBetHistoryList.map(
                            (item, index) => {
                                return <CustomerBetHistoryItem key={index} customerBetHistoryItem={item} />
                            }
                        )
                    }
                </ul>
            </div>
        );
    }
}

class CustomerBetHistoryItem extends React.Component {
    render() {

        return (
            <div className="customer-bet-history-item" style={{ borderBottom: '1px solid #ebeff2', marginBottom: '8px' }}>
                <div className="row">
                    <div>
                        <h4>
                            Customer ID: {this.props.customerBetHistoryItem.customer}
                        </h4>
                    </div>
                    <div>
                        {
                            this.props.customerBetHistoryItem.riskStatus > 0 ?
                                <span style={{ color: '#FF0000', padding: '0px 3px' }}>High Risk</span> : <span></span>
                        }
                    </div>
                </div>
                <BetHistory
                    settledBets={this.props.customerBetHistoryItem.settledBets}
                    unsettledBets={this.props.customerBetHistoryItem.unsettledBets} />
            </div>
        );
    }
}

class BetHistory extends React.Component {
    render() {
        return (
            <div className="bet-history">
                <div className="row">
                    <div className="col-sm-6 col-xs-12">
                        <h4>Settled Bets</h4>
                        <div>
                            <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                                {
                                    this.props.settledBets.map(
                                        (item, index) => {
                                            return <li key={index}><BetHistoryItem betHistoryItem={item} isBetSettled="1" /></li>
                                        }
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xs-12">
                        <h4>Unsettled Bets</h4>
                        <div>
                            <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                                {
                                    this.props.unsettledBets.map(
                                        (item, index) => {
                                            return <li key={index}><BetHistoryItem betHistoryItem={item} isBetSettled="0" /></li>
                                        }
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class BetHistoryItem extends React.Component {
    render() {
        return (
            <div className="bet-history-item" style={{ borderTop: '1px solid #ebeff2' }}>
                <div className="row">
                    <div className="col-xs-3">Event: {this.props.betHistoryItem.event}</div>
                    <div className="col-xs-3">Participant: {this.props.betHistoryItem.event}</div>
                    <div className="col-xs-3">Stake: {this.props.betHistoryItem.stake}</div>
                    {
                        this.props.isBetSettled == 1 ?
                            <div className="col-xs-3">Win: {this.props.betHistoryItem.win}</div> :
                            <div className="col-xs-3">To Win: {this.props.betHistoryItem.toWin}</div>
                    }
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));