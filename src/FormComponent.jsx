/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';

type Place = {
    id: number,
    content: string,
}

type Member = {
    id: number,
    name: string,
    places: Array<Place>,
    nextPlaceId: number
}

type State = {
    members: Array<Member>,
    nextMemberId: number,
    location: string,
}

type Props = {

}

export default class FormComponent extends React.Component {
    props: Props;   
    state: State;

    constructor(props: Props){
        super(props);
        this.state = {
            members: [],
            nextMemberId: 0,
            location: ''
        }
    }

    handleFindRoutes(){
        alert('not implemented yet')
    }

    renderNewLocationInput(){
        let onChange = (ev)  => {
            let location = ev.target.value;
            this.setState({ location });
        }
        return (<div>
            Your new location: <br/>
            <input type="text" placeholder="type new location" onChange={onChange} />
            </div>);
    }

    renderFindRoutesButton(){
        return <button onClick={this.handleFindRoutes}>Ok - find the routes</button>;
    }
    
    renderMembersConfigInput(){
        let handleAddNewMemberInput = () => {
            let nextMemberId = this.state.nextMemberId + 1;
            let members = this.state.members.slice();
            members.push({id: nextMemberId, places: [], nextPlaceId: 0});
            this.setState({ members, nextMemberId });
        }
        let res = [<p>Type new members: </p>];
        for(let member of this.state.members){
            res.push(this.renderSingleMemberConfig(member));
        }
        res.push(<button onClick={handleAddNewMemberInput}>+</button>);
        return res;
    }

    renderSingleMemberConfig(member){
        let handleMemberNameChanged = (ev) => {
            let members = this.state.members.slice();
            let m = members.filter(e => e.id == member.id)[0];
            m.name = ev.target.value;
            this.setState({ members });
        }
        let handleAddNewPlace = () => {
            let members = this.state.members.slice();
            let m = members.filter(e => e.id == member.id)[0];
            m.places.push({ id: m.nextPlaceId, content: ''});
            m.nextPlaceId = m.nextPlaceId + 1;
            this.setState({ members });
        }
        let handleDeleteMember = () => {
            let members = this.state.members.filter(e => e.id != member.id);
            this.setState({ members });
        }
        let placesInputs = ["Locations:", <br/>];
        for(let place of member.places){
            placesInputs.push(this.renderSinglePlaceInput(member.id, place));
        }
        placesInputs.push(<button onClick={handleAddNewPlace}>+</button>);
        return (<div style={{marginLeft: '10px', border: 'black solid 1px'}}>
            Name: <button onClick={handleDeleteMember}>-</button><br/>
            <input placeholder="name" onChange={handleMemberNameChanged} />
            <div style={{marginLeft: '10px'}}>
            {placesInputs}
            </div>
        </div>);
    }

    renderSinglePlaceInput(memberId, place){
        let onChange = (ev) => {
            let members = this.state.members.slice();
            let m = members.filter(e => e.id == memberId)[0];
            let place = m.places.filter(p => p.id == place.id)[0];
            place.content = ev.target.value;
            this.setState({ members });
        }
        let handleDeletePlace = () => {
            let members = this.state.members.slice();
            let m = members.filter(e => e.id == memberId)[0];
            debugger;
            m.places = m.places.filter(p => p.id != place.id);
            this.setState({ members });
        }
        return [
            <input placeholder="location" defaultValue={place.content} onChange={onChange}/>,
            <button onClick={handleDeletePlace}>-</button>,
            <br/>
        ];
    }

    render(){

        return <div>
            {this.renderNewLocationInput()}
            <hr />
            {this.renderMembersConfigInput()}
            <hr />
            {this.renderFindRoutesButton()}
        </div>;
    }

}