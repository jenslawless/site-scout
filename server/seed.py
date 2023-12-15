import json
from flask import Flask
from sqlalchemy import insert, text, create_engine
from config import db, app
from models import User, Address
# from geoalchemy2.functions import *
#from geoalchemy2.functions import ST_GeomFromGeoJSON

from geoalchemy2 import Geometry
from sqlalchemy.orm import sessionmaker


DATABASE_URI = 'postgresql://jenslawless:Mandy007!@localhost:5432/site_scout_1'
engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)
session = Session()


new_user = User(username="John Doe", _password_hash="hashed_password")
session.add(new_user)
session.commit()
sample_response = {
  "bbox": [
    -105.004448,
    39.723806,
    -104.945271,
    39.772406
  ],
  "features": [
    {
      "geometry": {
        "coordinates": [
          [
            [
              -105.004448,
              39.76271
            ],
            [
              -105.002915,
              39.752621
            ],
            [
              -105.002862,
              39.747765
            ],
            [
              -105.002349,
              39.743527
            ],
            [
              -105.00194,
              39.741447
            ],
            [
              -105.000337,
              39.739104
            ],
            [
              -104.993393,
              39.733463
            ],
            [
              -104.987303,
              39.727276
            ],
            [
              -104.985705,
              39.725474
            ],
            [
              -104.983753,
              39.724423
            ],
            [
              -104.978778,
              39.723807
            ],
            [
              -104.978651,
              39.723806
            ],
            [
              -104.976387,
              39.725478
            ],
            [
              -104.974627,
              39.727268
            ],
            [
              -104.972307,
              39.730319
            ],
            [
              -104.965378,
              39.735147
            ],
            [
              -104.962369,
              39.7366
            ],
            [
              -104.957976,
              39.73981
            ],
            [
              -104.95672,
              39.741786
            ],
            [
              -104.95031,
              39.749375
            ],
            [
              -104.947739,
              39.752636
            ],
            [
              -104.945271,
              39.75807
            ],
            [
              -104.945271,
              39.758214
            ],
            [
              -104.946593,
              39.760007
            ],
            [
              -104.94973,
              39.761882
            ],
            [
              -104.959835,
              39.766294
            ],
            [
              -104.964094,
              39.769958
            ],
            [
              -104.970591,
              39.771862
            ],
            [
              -104.971289,
              39.772057
            ],
            [
              -104.973894,
              39.772406
            ],
            [
              -104.982002,
              39.770106
            ],
            [
              -104.985995,
              39.769384
            ],
            [
              -104.996651,
              39.7655
            ],
            [
              -105.004372,
              39.763043
            ],
            [
              -105.004448,
              39.76271
            ]
          ]
        ],
        "type": "Polygon"
      },
      "properties": {
        "center": [
          -104.9810949479414,
          39.75154521269697
        ],
        "group_index": 0,
        "value": 300.0
      },
      "type": "Feature"
    }
  ],
  "metadata": {
    "attribution": "openrouteservice.org | OpenStreetMap contributors",
    "engine": {
      "build_date": "2023-07-09T01:31:50Z",
      "graph_date": "2023-07-30T10:09:57Z",
      "version": "7.1.0"
    },
    "query": {
      "locations": [
        [
          -104.9809722,
          39.75163999999999
        ]
      ],
      "profile": "driving-car",
      "range": [
        300.0
      ],
      "range_type": "time"
    },
    "service": "isochrones",
    "timestamp": 1690855184033
  },
  "type": "FeatureCollection"
}

coordinates = sample_response['features'][0]['geometry']['coordinates']

center = sample_response['features'][0]['properties']['center']
flat_coordinates = [f"{lon} {lat}" for lon, lat in coordinates[0]]
wkt_coordinates = f"POLYGON(({', '.join(flat_coordinates + [flat_coordinates[0]])}))"

new_address = Address(isochrone=wkt_coordinates, user_id=1, address='505 24th Street', center=f"POINT({center[0]} {center[1]})")


session.add(new_address)
session.commit()
session.close()














# # Create a new address instance
# new_address = Address(user_id=new_user.id, address="123 Main Street")

# # Isochrone data (nested list of 20 pairs of latitude and longitude)
# isochrone_data = [
#     [40.7128, -74.0060],  
#     [40.7129, -74.0061],  
#     [40.7130, -74.0062],  
#     [40.7147, -74.0079],  
# ]

# new_address.isochrones = isochrone_data

# with app.app_context():

#     db.session.add(new_user)
#     db.session.commit()


#     new_address.user_id = new_user.id


#     db.session.add(new_address)
#     db.session.commit()


# def seed_data():
#     # Seed data for a sample user and address
#     user = User(username='john_doe')
#     db.session.add(user)
#     db.session.commit()

#     address_input = "123 Main St, City, Country"
#     latitude, longitude = get_geocoding_data(address_input)

#     address = Address(user_id=user.id, address=address_input, latitude=latitude, longitude=longitude)
#     db.session.add(address)
#     db.session.commit()

#     isochrone_coordinates = get_isochrone_data(latitude, longitude)

#     isochrone = Isochrone(address_id=address.id, isochrone_coordinates=isochrone_coordinates)
#     db.session.add(isochrone)
#     db.session.commit()

#     # app/seeder.py
# from app import db
# from app.models import User, Address

# def seed_data():
#     # Seed data for a sample user and address
#     user = User(username='john_doe')
#     db.session.add(user)
#     db.session.commit()

#     address_input = "123 Main St, City, Country"
#     latitude, longitude = 40.7128, -74.0060  # Fake coordinates for the location

#     address = Address(user_id=user.id, address=address_input, location=f'POINT({longitude} {latitude})')
#     db.session.add(address)
#     db.session.commit()

#     # Fake isochrone coordinates
#     isochrone_coordinates = [
#         [longitude, latitude],
#         [longitude + 0.01, latitude + 0.01],
#         [longitude - 0.01, latitude - 0.01],
#     ]
#     address.isochrones = isochrone_coordinates
#     db.session.commit()






