from flask import Flask, request, jsonify
import requests
from config import db, app, api
import os
from models import *
from flask_restful import Api, Resource
import time
from sqlalchemy.orm import sessionmaker
from sqlalchemy import insert, text, create_engine

app = Flask(__name__)
api = Api(app)

API_KEY = os.environ.get('GOOGLE_MAPS_API_KEY')
ORS_API_KEY=os.environ.get('ORS_API_KEY')

DATABASE_URI = 'postgresql://jenslaw:Mandy007!@localhost:5432/site_scout_1'
engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)
session = Session()

class GeocodeAddress(Resource):
    def post(self):
        data = request.get_json()
        address = data.get('address')   
        travel_time = data.get('time')
        print(travel_time)

        if not address:
            return {'error': 'Address parameter is missing.'}, 400
        
        params = {
            'key': API_KEY,
            'address': address
        }

        base_url = 'https://maps.googleapis.com/maps/api/geocode/json?'
        response = requests.get(base_url, params=params)
        
        if response.status_code == 200:
            data = response.json()
            print(data)
            print(travel_time)
            lat = data['results'][0]['geometry']['location']['lat']
            lng = data['results'][0]['geometry']['location']['lng']

            headers = {
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
                'Authorization': ORS_API_KEY,
                'Content-Type': 'application/json; charset=utf-8'
            }

            body = {
                    'locations': [[lng, lat]],
                    'range': [travel_time], 
                    'range_type': 'time'
            }

            ors_base_url = 'https://api.openrouteservice.org/v2/isochrones/driving-car'
            ors_response = requests.post(ors_base_url, json=body, headers=headers)

            time.sleep(1)

            if ors_response.status_code == 200:
                ors_data = ors_response.json() 
                
                center_point = ors_data['features'][0]['properties']['center']
                polygon_coordinates = ors_data['features'][0]['geometry']['coordinates']
                flat_coordinates = [f"{lon} {lat}" for lon, lat in polygon_coordinates[0]]
                wkt_coordinates = f"POLYGON(({', '.join(flat_coordinates + [flat_coordinates[0]])}))"

                new_address = Address(isochrone=wkt_coordinates, user_id=1, address=address, center=f"POINT({center_point[0]} {center_point[1]})")

                session.add(new_address)
                session.commit()
                session.close()

            else:
                return {'error': 'Error fetching isochrone data.'}, 500
        else:
            return {'error': 'Error fetching geolocation data.'}, 500
        
api.add_resource(GeocodeAddress, '/geocode')

if __name__ == '__main__':
    app.run(port=5555, debug=True)




