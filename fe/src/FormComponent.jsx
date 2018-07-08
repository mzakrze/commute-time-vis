/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'node-fetch';

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

    // TODO - members name must be unique

    handleFindRoutes(){
        let location = this.state.location;
        let users = {};
        for(let m of this.state.members){
            let name = m.name;
            let places = [];
            for(let p of m.places){
                places.push(p.content)
            }
            users[name] = places;
        }

        let requestBody = {
            location, users
        }

        fetch('/api/routes', { method: 'POST', body: JSON.stringify(requestBody) })
            .then(res => res.json())
            .then(data => {
                console.log('got response: ')
                console.log(JSON.stringify(data))
            });
    }

    renderNewLocationInput(){
        let onChange = (ev)  => {
            let location = ev.target.value;
            this.setState({ location });
        }
        return (<div>
            Your new location: <br/>
            <input placeholder="type new location" value={this.state.location} onChange={onChange} />
            </div>);
    }

    renderFindRoutesButton(){
        return <button onClick={this.handleFindRoutes.bind(this)}>Ok - find the routes</button>;
    }

    renderSaveAndLoadSettingsButtons(){
        const key = 'settings';
        let saveAction = () => {
            let stateAsJson = JSON.stringify(this.state);
            console.log(stateAsJson)
            localStorage.setItem(key, stateAsJson);
        }
        let loadAction = () => {
            let stateAsJson = localStorage.getItem(key);
            let newState = JSON.parse(stateAsJson);
            this.setState(newState);
        }
        return [
            <button onClick={saveAction}>Save settings</button>,
            <button onClick={loadAction}>Load settings</button>
        ];
    }
    
    renderMembersConfigInput(){
        let handleAddNewMemberInput = () => {
            let nextMemberId = this.state.nextMemberId;
            let members = this.state.members.slice();
            members.push({id: nextMemberId, places: [], nextPlaceId: 0});
            this.setState({ 
                members: members, 
                nextMemberId: nextMemberId + 1 });
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
            <input placeholder="name" value={member.name} onChange={handleMemberNameChanged} />
            <div style={{marginLeft: '10px'}}>
            {placesInputs}
            </div>
        </div>);
    }

    renderSinglePlaceInput(memberId, place){
        let onChange = (ev) => {
            let members = this.state.members.slice();
            let m = members.filter(e => e.id == memberId)[0];
            let membersPlace = m.places.filter(p => p.id == place.id)[0];
            membersPlace.content = ev.target.value;
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

        console.log(this.state)
        return <div>
            {this.renderNewLocationInput()}
            <hr />
            {this.renderMembersConfigInput()}
            <hr />
            {this.renderFindRoutesButton()}
            {this.renderSaveAndLoadSettingsButtons()}
        </div>;
    }

}
