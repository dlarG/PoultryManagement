from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db_connection
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required fields. Please provide both.'}), 400
    
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Database connection failed.'}), 500
    
    cur = conn.cursor()
    try:
        cur.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cur.fetchone()
        if user and check_password_hash(user[2], password):
            return jsonify({
                'message': 'Login successful!',
                'role': user[3],  
                'username': user[1],  
                'firstname': user[4], 
                'lastname': user[6]  
            }), 200
        else:
            return jsonify({'error': 'Invalid username or password.'}), 401
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500
    finally:
        cur.close()
        conn.close()

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    firstname = data.get('firstname')
    lastname = data.get('lastname')
    role = "guest"  # Default role

    if not username or not password or not firstname or not lastname:
        return jsonify({'error': 'All fields are required. Please try again.'}), 400
    
    conn = get_db_connection()
    if conn is None:
        return jsonify({'error': 'Database connection failed.'}), 500
    
    cur = conn.cursor()
    try:
        hashed_password = generate_password_hash(password)
        cur.execute("INSERT INTO users(username, password, role, firstname, lastname) VALUES (%s, %s, %s, %s, %s)",
                   (username, hashed_password, role, firstname, lastname))
        conn.commit()
        return jsonify({'message': 'User registered successfully!'}), 201
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500
    finally:
        cur.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)