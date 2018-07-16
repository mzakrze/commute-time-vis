
import React from 'react';
import ReactDOM from 'react-dom';

import LeafletComponent from './LeafletComponent.jsx';
import FormComponent from './FormComponent.jsx';

class App extends React.Component {

        constructor(props){
            super(props);
            this.state = {
                form: null,
                response: null,
            }
        }

        handleGotResponse(form, response){
            this.setState({
                form, response
            })
        }

    render() {
        return <div>
            <h2> Title to be done </h2>
            <span>
                <div style={{display:'inline-block', marginRight:'20px'}}>
                    <LeafletComponent 
                        form={this.state.form}
                        response={this.state.response}/>
                </div>
                <div style={{display:'inline-block', width: '600px'}}>
                    <FormComponent 
                        notify={this.handleGotResponse.bind(this)}/>
                </div>
            </span>
        </div>;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));