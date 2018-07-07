/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';

import LeafletComponent from './LeafletComponent.jsx';
import FormComponent from './FormComponent.jsx';

class App extends React.Component {
    render() {
        return <div>
            <h2> Title to be done </h2>
            <span>
                <div style={{display:'inline-block', marginRight:'20px'}}>
                    <LeafletComponent />
                </div>
                <div style={{display:'inline-block'}}>
                    <FormComponent />
                </div>
            </span>
        </div>;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));