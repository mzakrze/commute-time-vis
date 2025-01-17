
import React from 'react';
import ReactDOM from 'react-dom';


export default class LeafletComponent extends React.Component {

    componentDidMount(){
        var mymap = L.map('leaftlet-map-id',{
            contextmenu: true,
            contextmenuWidth: 140,
            contextmenuItems: [{
                text: 'Show coordinates',
                callback: () => {console.log('im in callback')}
            }]
	    }).setView([51.505, -0.09], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(mymap);

        L.marker([51.5, -0.09]).addTo(mymap)
            .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

        L.circle([51.508, -0.11], 500, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(mymap).bindPopup("I am a circle.");

        L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ]).addTo(mymap).bindPopup("I am a polygon.");


        var popup = L.popup();

        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(mymap);
        }

        mymap.on('click', onMapClick);

        // mymap.on('contextmenu',function(){
        //     let p = L.popup();
        //     p.setContent('<p>Hello world!<br />This is a nice popup.</p>'); 
        //     p.openOn(mymap);
        // });
    }

    render() {
        return <div id="leaftlet-map-id"></div>;
    }
}
