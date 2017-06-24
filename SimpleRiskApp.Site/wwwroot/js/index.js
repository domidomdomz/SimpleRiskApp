const MOCKRESULT = [
    {
        customer: 1,
        riskStatus: 1,
        settledBets: [
            {
                win: 250,
                customer: 1,
                event: 1,
                participant: 6,
                stake: 50
            },
            {
                win: 60,
                customer: 1,
                event: 2,
                participant: 1,
                stake: 20
            },
            {
                win: 0,
                customer: 1,
                event: 3,
                participant: 5,
                stake: 50
            },
            {
                win: 120,
                customer: 1,
                event: 4,
                participant: 1,
                stake: 50
            },
            {
                win: 400,
                customer: 1,
                event: 5,
                participant: 10,
                stake: 50
            },
            {
                win: 0,
                customer: 1,
                event: 5,
                participant: 7,
                stake: 40
            },
            {
                win: 160,
                customer: 1,
                event: 6,
                participant: 4,
                stake: 40
            },
            {
                win: 320,
                customer: 1,
                event: 8,
                participant: 5,
                stake: 80
            },
            {
                win: 480,
                customer: 1,
                event: 9,
                participant: 2,
                stake: 60
            },
            {
                win: 0,
                customer: 1,
                event: 9,
                participant: 4,
                stake: 50
            }
        ],
        unsettledBets: [
            {
                toWin: 500,
                customer: 1,
                event: 11,
                participant: 4,
                stake: 50
            },
            {
                toWin: 5000,
                customer: 1,
                event: 12,
                participant: 4,
                stake: 500
            },
            {
                toWin: 200,
                customer: 1,
                event: 13,
                participant: 3,
                stake: 50
            },
            {
                toWin: 8000,
                customer: 1,
                event: 14,
                participant: 2,
                stake: 1000
            }
        ]
    },
    {
        customer: 2,
        riskStatus: 0,
        settledBets: [
            {
                win: 0,
                customer: 2,
                event: 1,
                participant: 3,
                stake: 5
            },
            {
                win: 15,
                customer: 2,
                event: 2,
                participant: 1,
                stake: 5
            },
            {
                win: 0,
                customer: 2,
                event: 3,
                participant: 5,
                stake: 10
            },
            {
                win: 0,
                customer: 2,
                event: 4,
                participant: 5,
                stake: 10
            },
            {
                win: 0,
                customer: 2,
                event: 5,
                participant: 7,
                stake: 10
            },
            {
                win: 0,
                customer: 2,
                event: 6,
                participant: 3,
                stake: 15
            },
            {
                win: 0,
                customer: 2,
                event: 7,
                participant: 8,
                stake: 10
            },
            {
                win: 0,
                customer: 2,
                event: 7,
                participant: 7,
                stake: 20
            },
            {
                win: 0,
                customer: 2,
                event: 9,
                participant: 3,
                stake: 20
            },
            {
                win: 0,
                customer: 2,
                event: 9,
                participant: 10,
                stake: 20
            }
        ],
        unsettledBets: [
            {
                toWin: 200,
                customer: 2,
                event: 12,
                participant: 4,
                stake: 20
            },
            {
                toWin: 50,
                customer: 2,
                event: 13,
                participant: 1,
                stake: 10
            },
            {
                toWin: 60,
                customer: 2,
                event: 14,
                participant: 5,
                stake: 15
            }
        ]
    }
];

    

class Main extends React.Component {
    
    render() {

        //console.log(this.props.myData);
        
        return (
            <div style={{ padding: '15px' }}>
                <CustomerBetHistory customerBetHistoryList={this.props.myData} />
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

ReactDOM.render(<Main myData={MOCKRESULT} />, document.getElementById('root'));