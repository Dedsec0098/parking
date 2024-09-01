import React from 'react';
import Radar from 'radar-sdk-js';
import 'radar-sdk-js/dist/radar.css';
import './RadarMap.css';
import mockData from '../assets/mockData.json';

class RadarMap extends React.Component {
  componentDidMount() {
    const apiKey = 'prj_test_pk_c930b0ad7045f6ed46872536a3fd6582d0e3619c'; 
    Radar.initialize(apiKey);

    this.map = Radar.ui.map({
      container: 'map',
      style: 'radar-dark-v1',
      center: [80.04411, 12.82113], 
      zoom: 13,
    });

    // Loop through the updated mock data and add markers for each parking location
    mockData.parkingLocations.forEach(location => {
      Radar.ui.marker({
        color: '#e60f0f',
        popup: {
          html: `<div style="
          text-align: center;
          color: black;
          background-color: white; 
          border-radius: 5px;
          padding: 10px; 
        ">
        <h3 style="margin: 0; font-size: 16px;">${location.title}</h3>
        <p style="margin: 5px 0 0; font-size: 14px;">Capacity: ${location.capacity} vehicles</p>
        <p style="margin: 5px 0 0; font-size: 14px;">Distance: ${location.distanceFromUser} meters</p>
      </div>`,
          offset: [0, -10], 
        }
      })
      .setLngLat([location.longitude, location.latitude])
      .addTo(this.map);
    });

    // Autocomplete functionality
    Radar.ui.autocomplete({
      container: 'autocomplete',
      showMarkers: true,
      markerColor: '#e60f0f',
      responsive: true,
      width: '400px',
      maxHeight: '600px',
      placeholder: 'Search address...',
      limit: 8,
      minCharacters: 3,
      near: '12.82109, 80.04409',
      onSelection: (address) => {
        const coordinates = address.geometry.coordinates;
        const [lng, lat] = coordinates;

        if (this.marker) {
          this.marker.setLngLat([lng, lat]);
        } else {
          this.marker = Radar.ui.marker({
            color: '#e60f0f',
            popup: {
              html: `<div style="
              text-align: center;
              color: black;
              background-color: white; 
              border-radius: 5px;
              padding: 10px; 
            ">
            <h3 style="margin: 0; font-size: 16px;">Selected Location</h3>
            <p style="margin: 5px 0 0; font-size: 14px;">This is a selected location.</p>
          </div>`,
              offset: [0, -10], 
            }
          })
          .setLngLat([lng, lat])
          .addTo(this.map);
        }

        this.map.setCenter([lng, lat]);
        this.map.setZoom(14);
      },
    });
  }

  render() {
    return (
      <div id="map-container" style={{ width: '80%', height: '500px', margin: '0 auto', position: 'relative',  }}>
        <div id="autocomplete" className="search-container"></div>
        <div id="map" style={{ height: '100%', width: '100%' }}></div>
      </div>
    );
  }
}

export default RadarMap;