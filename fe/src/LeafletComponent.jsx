
import React from 'react';
import ReactDOM from 'react-dom';


export default class LeafletComponent extends React.Component {
    mymap: any;
    colorCounter;

    constructor(props){
        super(props);
        this.colorCounter = 0;
    }

    componentDidMount(){
        this.mymap = L.map('leaftlet-map-id',{

	    }).setView([52.237049, 21.017532], 12);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(this.mymap);
    }

    getColor(){
        const colors = ['red', 'green', 'blue', 'orange'];
        return colors[this.colorCounter++];
    }

    componentWillReceiveProps({form, response}){
        let result = {};
        let members = form.members;
        for(let m of form.members){
            let membersColor = this.getColor();
            let membersResult = {
                color: membersColor,
                places: {}
            }
            let usersPlaces = response[m.name];
            let membersPlaces = {}; // TODO
            for(let placeName of Object.keys(usersPlaces)){
                let membersPlaceRoutes = [];
                let placeInstr = usersPlaces[placeName];
                if(placeInstr.status != "OK"){
                    alert('For member ' + m.name + " place " + placeName + " not found");
                    continue;
                }
                let steps = placeInstr["routes"][0]["legs"][0]["steps"];
                let points = [];
                let isFirst = true;
                for(let step of steps){
                    debugger;
                    if(isFirst){
                        isFirst = false;
                        points.push(new L.LatLng(step.start_location.lat, step.start_location.lng));
                    }
                    if(step.steps){
                        for(let d_step of step.steps){
                            points.push(new L.LatLng(d_step.end_location.lat, d_step.end_location.lng));
                        }
                    }
                    points.push(new L.LatLng(step.end_location.lat, step.end_location.lng));
                }
                var polyLine = new L.polyline(points, {
                    color: membersColor,
                    weight: 3,
                    opacity: 0.5,
                    smoothFactor: 1
                });
                polyLine.bindPopup(m.name + "," + placeName);
                polyLine.addTo(this.mymap);
                let membersPlace = { // TODO
                    name: placeName,
                    routes: membersPlaceRoutes
                }
            }
            result[m.name] = membersResult;
        }
    }

    render() {
        return <div id="leaftlet-map-id"></div>;
    }
}
