"""Initial Migration

Revision ID: ce05323b1a0f
Revises: 
Create Date: 2023-12-14 21:22:16.593196

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
import geoalchemy2

# revision identifiers, used by Alembic.
revision = 'ce05323b1a0f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('addresses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.String(), nullable=True),
    sa.Column('address', sa.String(), nullable=True),
    sa.Column('center', geoalchemy2.types.Geometry(geometry_type='POINT', srid=4326, from_text='ST_GeomFromEWKT', name='geometry'), nullable=True),
    sa.Column('isochrone', geoalchemy2.types.Geometry(geometry_type='POLYGON', srid=4326, from_text='ST_GeomFromEWKT', name='geometry'), nullable=True),
    sa.Column('time_range', postgresql.ARRAY(sa.Integer()), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_addresses'))
    )
    # with op.batch_alter_table('addresses', schema=None) as batch_op:
    #     batch_op.create_index('idx_addresses_center', ['center'], unique=False, postgresql_using='gist')
    #     batch_op.create_index('idx_addresses_isochrone', ['isochrone'], unique=False, postgresql_using='gist')

    # op.drop_table('spatial_ref_sys')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('spatial_ref_sys',
    sa.Column('srid', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('auth_name', sa.VARCHAR(length=256), autoincrement=False, nullable=True),
    sa.Column('auth_srid', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('srtext', sa.VARCHAR(length=2048), autoincrement=False, nullable=True),
    sa.Column('proj4text', sa.VARCHAR(length=2048), autoincrement=False, nullable=True),
    sa.CheckConstraint('srid > 0 AND srid <= 998999', name='spatial_ref_sys_srid_check'),
    sa.PrimaryKeyConstraint('srid', name='spatial_ref_sys_pkey')
    )
    with op.batch_alter_table('addresses', schema=None) as batch_op:
        batch_op.drop_index('idx_addresses_isochrone', postgresql_using='gist')
        batch_op.drop_index('idx_addresses_center', postgresql_using='gist')

    op.drop_table('addresses')
    # ### end Alembic commands ###
