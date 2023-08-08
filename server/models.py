from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from geoalchemy2 import Geometry
from sqlalchemy.dialects.postgresql import ARRAY

from config import db, bcrypt

class Address(db.Model, SerializerMixin):
    __tablename__ = "addresses"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String)
    address = db.Column(db.String)
    center = db.Column(Geometry('POINT', srid=4326))
    isochrone = db.Column(Geometry('POLYGON', srid=4326))
    time_range = db.Column(ARRAY(db.Integer))

    def to_dict(self):
        data = SerializerMixin.to_dict(self)
        data['center'] = [self.center.x, self.center.y] if self.center else None
        data['isochrone'] = self._serialize_polygon(self.isochrone) if self.isochrone else None
        return data

    def _serialize_polygon(self, polygon):
        if not polygon:
            return None
        
        def json_serializable(val):
            # Check if the value is of a non-serializable type and convert it to a string
            if isinstance(val.__class__, DeclarativeMeta):
                return str(val)
            return val

        # Convert the polygon to a JSON-serializable format
        geojson = {
            "type": "Polygon",
            "coordinates": [list(map(json_serializable, to_shape(polygon).exterior.coords))]
        }
        return geojson



# class User(db.Model, SerializerMixin):
#     __tablename__ = "users"

#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String)
#     _password_hash = db.Column(db.String)

# class SavedMaps(db.Model, SerializerMixin):

#     __tablename__ = "saved_maps"

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.String)
#     address = db.Column(db.String)
#     center = db.Column(Geometry('POINT', srid=4326))
#     isochrone = db.Column(Geometry('POLYGON', srid=4326))
#     time_chosen = db.Column(db.Integer)






