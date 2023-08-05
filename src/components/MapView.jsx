import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { TileLayer, Marker, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ coordinates }) => {

  const findPolygonCenter = (coords) => {
    const len = coords.length;
    const center = coords.reduce(
      (acc, [lng, lat]) => [acc[0] + lng / len, acc[1] + lat / len],
      [0, 0]
    );
    return center;
  };

  const mapCenter = findPolygonCenter(coordinates);

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polygon positions={coordinates} />
    </MapContainer>
  );
};

export default MapView;


