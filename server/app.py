from flask import Flask, request, jsonify
import requests
from config import db, app, api
import os
from models import *
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

API_KEY = os.environ.get('GOOGLE_MAPS_API_KEY')
ORS_API_KEY=os.environ.get('ORS_API_KEY')

class GeocodeAddress(Resource):
    def get(self):
        address = '505 24th Street Denver, CO, 80205'
        # request.args.get('address')   
        
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
            lat = data['results'][0]['geometry']['location']['lat']
            lng = data['results'][0]['geometry']['location']['lng']

            headers = {
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
                'Authorization': ORS_API_KEY,
                'Content-Type': 'application/json; charset=utf-8'
            }

            body = {
                    'locations': [[lng, lat]],
                    'range': [300],  
                    'range_type': 'time'
            }

            ors_base_url = 'https://api.openrouteservice.org/v2/isochrones/driving-car'
            ors_response = requests.post(ors_base_url, json=body, headers=headers)

            if ors_response.status_code == 200:
                ors_data = ors_response.json() 
                return ors_data
            else:
                return {'error': 'Error fetching isochrone data.'}, 500
        else:
            return {'error': 'Error fetching geolocation data.'}, 500

api.add_resource(GeocodeAddress, '/geocode')

if __name__ == '__main__':
    app.run(port=5555, debug=True)




