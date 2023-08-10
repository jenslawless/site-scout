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

    for (const key in coords) {
      const coordinatePair = coords[key];
      if (
        Array.isArray(coordinatePair) &&
        coordinatePair.length === 2 &&
        typeof coordinatePair[0] === "number" &&
        typeof coordinatePair[1] === "number"
      ) {
        const [lng, lat] = coordinatePair;
        switchedCoords.push([lat, lng]);
      }
    }

    return switchedCoords;
  }

  function switchSingleCoordinate(coordinate) {
    if (Array.isArray(coordinate) && coordinate.length === 2) {
      const [lng, lat] = coordinate;
      return [lat, lng];
    }
    return coordinate;
  }

  const switchedPolygon = switchCoordinatePositions(coordinates);
  const switchedCenter = switchSingleCoordinate(mapCenter)

  return (
    <MapContainer className='map-container' center={switchedCenter} zoom={11}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polygon pathOptions={purpleOptions} positions={switchedPolygon} />
      <Marker position={switchedCenter}>
        <Popup>
          This is the location you entered.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;


// style={{ height: '400px', width: '100%', justifyContent: "center" }}

