import React from 'react';
import CustomerBetHistoryItem from './CustomerBetHistoryItem.jsx';

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

export default CustomerBetHistory;