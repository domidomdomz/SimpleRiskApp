import React from 'react';

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

export default BetHistoryItem;