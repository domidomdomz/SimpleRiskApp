import React from 'react';
import BetHistoryItem from './BetHistoryItem.jsx';

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

export default BetHistory;