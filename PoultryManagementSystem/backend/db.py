import psycopg2
from psycopg2 import OperationalError

def get_db_connection():
    """Establish a connection to the PostgreSQL database."""
    try:
        connection = psycopg2.connect(
            dbname='poultry_db',
            user='postgres',  
            password='root123',
            host='localhost',
            port='5432'  
        )
        print("Successfully connected to the database!")
        return connection
    except OperationalError as e:
        print(f"Error connecting to PostgreSQL: {e}")
        return None