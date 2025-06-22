from db import get_db_connection

print("Testing database connection...")
conn = get_db_connection()

if conn:
    print("Connection successful!")
    conn.close()
else:
    print("Connection failed")