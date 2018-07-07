/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return (<p>
            Hi, i am a react application
        </p>);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));