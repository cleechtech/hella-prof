
var oakland = { lat: 37.807314, lng: -122.271371 };
var map = L.map('map-container').setView([oakland.lat, oakland.lng], 11);
var geojson;

// CREATE MAP
L.tileLayer('https://{s}.tiles.mapbox.com/v3/jasonshark.k625oka7/{z}/{x}/{y}.png', {
    attribution: 'Mapbox n stuff'
}).addTo(map);

geojson = L.geoJson(oakZips, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

// INFO BOX
var info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Oakland Police Beats</h4>' +  (props ?
        '<b>' + props.zip + '</b><br />' + props.CRIMES + ' crimes'
        : 'Hover over a neighborhood');
};
info.addTo(map);

// LEGEND
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};
legend.addTo(map);

// this will be number of crimes
// "properties": { "ZIP": "94602", "number of crimes": 32434, "rapes": 32423, "burglaries": 324324 }
// fillColor: getColor(feature.properties.density)
function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: '#FC4E2A',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.8
    };
};

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: function(e) {
		    var layer = e.target;

		    layer.setStyle({
		        weight: 5,
		        color: '#666',
		        dashArray: '',
		        fillOpacity: 1
		    });

		    info.update(layer.feature.properties);

		    if (!L.Browser.ie && !L.Browser.opera) {
		        layer.bringToFront();
		    }
		},
        mouseout: function(e) {
		    geojson.resetStyle(e.target);
		    info.update();
		},
        click: function(e) {
		    map.fitBounds(e.target.getBounds());
		}
    });
}

