import React from 'react';
import BetHistory from './BetHistory.jsx';

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

export default CustomerBetHistoryItem;