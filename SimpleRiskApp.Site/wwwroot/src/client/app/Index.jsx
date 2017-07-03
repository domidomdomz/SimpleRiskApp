import React from 'react';
import ReactDOM from 'react-dom';

import CustomerBetHistory from './CustomerBetHistory.jsx';

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

ReactDOM.render(<Main />, document.getElementById('root'));