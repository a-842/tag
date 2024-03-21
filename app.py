from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)
DATABASE = 'database.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
    conn.commit()
    conn.close()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
    user = cursor.fetchone()
    conn.close()

    if not user:
        return jsonify({'error': 'Invalid username or password'}), 401

    return jsonify({'message': 'Login successful', 'user_id': user['id']}), 200

@app.route('/create_room', methods=['POST'])
def create_room():
    data = request.get_json()
    room_name = data.get('room_name')

    if not room_name:
        return jsonify({'error': 'Room name is required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO rooms (name) VALUES (?)", (room_name,))
    room_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return jsonify({'message': 'Room created successfully', 'room_id': room_id}), 201

@app.route('/join_room', methods=['POST'])
def join_room():
    data = request.get_json()
    room_id = data.get('room_id')

    if not room_id:
        return jsonify({'error': 'Room ID is required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM rooms WHERE id = ?", (room_id,))
    room = cursor.fetchone()

    if not room:
        conn.close()
        return jsonify({'error': 'Room not found'}), 404

    # Add logic to join room here (e.g., updating user's room_id in the database)

    conn.commit()
    conn.close()

    return jsonify({'message': 'Joined room successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=80)

