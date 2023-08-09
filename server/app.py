from flask import Flask, request, jsonify, make_response
import requests
from config import db, app, api
import os
from models import *
from flask_restful import Api, Resource
import time
from sqlalchemy.orm import sessionmaker
from sqlalchemy import insert, text, create_engine
from geoalchemy2 import functions
from geoalchemy2.shape import to_shape, from_shape
from shapely_geojson import dumps, Feature
from geojson import Feature, Polygon, FeatureCollection
import geoalchemy2
from geoalchemy2.functions import ST_AsText
from shapely.wkb import loads as wkb_loads
from shapely.wkt import loads as wkt_loads
from shapely import wkt


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
        get_user = data.get('user_id')

        if not address:
            return {'error': 'Address parameter is missing.'}, 400
        
        params = {
            'key': API_KEY,
            'address': address
        }

        base_url = 'https://maps.googleapis.com/maps/api/geocode/json?'
        response = requests.get(base_url, params=params)
        
        # # i think this is causing the error   
        # "Did not work, try again" 
        # because it is expecting both api calls to come back 
        # as successful but the second one hasn't been initiated yet. 
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

                new_address = Address(time_range=[travel_time], isochrone=wkt_coordinates, user_id=get_user, address=address, center=f"POINT({center_point[0]} {center_point[1]})")
                
                session.add(new_address)
                session.commit()

                get_center = new_address.center
                center_shape = geoalchemy2.shape.to_shape(get_center)
                center_coords = (center_shape.x, center_shape.y)

                new_isochrone_id = new_address.id
                new_center = center_coords

                session.close()

                response_data = {
                    'id': new_isochrone_id,
                    'center': new_center
                }

                return response_data, 200

            else:
                return {'error': 'Error fetching isochrone data.'}, 500
        else:
            return {'error': 'Error fetching geolocation data.'}, 500
        


class RetrieveAddress(Resource):
    def get(self, id):
        single_address = Address.query.filter_by(id=id).first()
        if single_address:
            shapely_geom = to_shape(single_address.isochrone)

            geojson_feature = Feature(geometry=Polygon(shapely_geom.exterior.coords))

            geojson = dumps(geojson_feature)
            return geojson, 200
        else:
            return jsonify({"error": "map not found"}), 400
        
    
    def delete(self, id):
        try:
            map_to_delete = Address.query.get(id)
            if map_to_delete:
                db.session.delete(map_to_delete)
                db.session.commit()
                return {"message": "Map deleted successfully"}, 200
            else:
                return {"error": "Map not found"}, 404
        except Exception as e:
            return {"error": str(e)}, 500


class GetUserMaps(Resource):
    def get(self, user_id):
        user_maps = Address.query.filter(Address.user_id == user_id).all()

        if user_maps:
            maps_data = []
            for user_map in user_maps:
                center_point_wkb = user_map.center
                center_point_shapely = to_shape(center_point_wkb)
                formatted_center = [(center_point_shapely.x), (center_point_shapely.y)]

                isochrone_wkb = user_map.isochrone
                isochrone_shapely = to_shape(isochrone_wkb)
                isochrone_coordinates = isochrone_shapely.exterior.coords
                formatted_coordinates = [[lon, lat] for lon, lat in isochrone_coordinates]

                maps_data.append({
                    "id": user_map.id,
                    "user_id": user_map.user_id,
                    "address": user_map.address,
                    "center": formatted_center,
                    "isochrone": formatted_coordinates,
                    "time_range": user_map.time_range
                })            

            return maps_data

        else:
            return jsonify({"error": "No maps found for this user"}), 400
        


api.add_resource(GeocodeAddress, '/geocode')
api.add_resource(RetrieveAddress, '/geocode/<int:id>')
api.add_resource(GetUserMaps, '/maps/<string:user_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)




