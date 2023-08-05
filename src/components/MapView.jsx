import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { TileLayer, Marker, Polygon, Popup, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ coordinates, center }) => {

  const mapCenter = center
  const purpleOptions = { color: 'purple' }

  function switchCoordinatePositions(coords) {
    const switchedCoords = [];

    for (let i = 0; i < coords.length; i++) {
      const [lng, lat] = coords[i];
      switchedCoords.push([lat, lng]);
    }

    return switchedCoords;
  }

  const switchedPolygon = switchCoordinatePositions(coordinates);
  const switchedCenter = switchCoordinatePositions(mapCenter)

  return (

    <MapContainer center={switchedCenter} zoom={13} style={{ height: '400px', width: '100%', justifyContent: "center" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polygon pathOptions={purpleOptions} positions={switchedPolygon} />
    </MapContainer>
  );
};

export default MapView;


