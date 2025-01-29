'''from flask import Flask, render_template, request, jsonify
import random
import subprocess
import os
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
from flask_cors import CORS


app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)
# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.confnpx create-react-app client --force
ig['MYSQL_PASSWORD'] = 'shivani123'  # Replace with your MySQL password
app.config['MYSQL_DB'] = 'dreamhome'  # Replace with your MySQL database name

mysql = MySQL(app)

# --- Routes ---

# Route for the homepage
@app.route('/')
def index():
    return render_template('index.html')

# Route for Three.js integration testing
@app.route('/threejs')
def threejs():
    return render_template('threejstest.html')

# Route for generating seed-based random values
@app.route('/<name>')
def seed(name):
    NUM_VARIABLES = 6
    name = hash(name)  # Convert name to an integer hash
    random.seed(name)
    seeds = [0] * (NUM_VARIABLES + 1)
    seeds[0] = name
    for i in range(NUM_VARIABLES + 1):
        seeds[i] = random.random()  # Generate random values from the seed

    return render_template('seed.html', seed=seeds)

# --- Authentication Routes ---

# User Registration
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        email = data['email']
        password = data['password']

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Check if the user already exists
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({'status': 'error', 'message': 'Email already exists'})

        # Insert new user into the database
        cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, hashed_password))
        mysql.connection.commit()
        cursor.close()

        return jsonify({'status': 'success', 'message': 'Registration successful'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

# User Login
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data['email']
        password = data['password']

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()

        if user and bcrypt.check_password_hash(user[2], password):  # Assuming `password` is the 3rd column
            return jsonify({'status': 'success', 'message': 'Login successful'})
        else:
            return jsonify({'status': 'error', 'message': 'Invalid email or password'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

# --- Blueprint and 3D Model Routes ---

# Generate blueprints based on user input
@app.route('/generate-blueprints', methods=['POST'])
def generate_blueprints():
    try:
        user_input = request.json  # Get input from frontend
        # Call GAN model for blueprint generation
        subprocess.run(['python', 'ai_models/blueprint_generator.py', str(user_input)], check=True)
        blueprints = ["blueprint1.svg", "blueprint2.svg"]  # Example output
        return jsonify({'status': 'success', 'blueprints': blueprints})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

# Generate a 3D model from a blueprint
@app.route('/generate-3d-model', methods=['POST'])
def generate_3d_model():
    try:
        blueprint_path = request.json['blueprintPath']
        # Call voxel generator
        subprocess.run(['python', 'ai_models/voxel_generator.py', blueprint_path], check=True)
        # Post-process with Blender
        subprocess.run(['blender', '--background', '--python', 'blender_scripts/process_model.py'], check=True)
        model_path = "/static/models/generated_model.glb"  # Example path
        return jsonify({'status': 'success', 'modelPath': model_path})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == "__main__":
    app.run(debug=True)'''
'''
import subprocess

from flask import Flask, request, jsonify
from flask_cors import CORS
from models.blueprint_generator import BlueprintGenerator
from models.three_d_model import ThreeDModelGenerator

from backend.ai_models.generate_model import generate_model

app = Flask(__name__)
CORS(app)

blueprint_generator = BlueprintGenerator()
three_d_model_generator = ThreeDModelGenerator()

@app.route('/generate-blueprints', methods=['POST'])
def generate_blueprints():
    user_input = request.json  # Get parameters
    generated_blueprints = blueprint_generator.generate(user_input)
    return jsonify(generated_blueprints)


@app.route('/upload-blueprint', methods=['POST'])
def upload_blueprint():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename.endswith(('.dxf', '.svg')):
        file.save(f'static/blueprints/{file.filename}')
        return jsonify({'status': 'success'})
    return jsonify({'error': 'Invalid file format'}), 400


@app.route('/generate-3d-model', methods=['POST'])
def generate_3d_model():
    blueprint = request.json.get('blueprint')
    try:
        model_path = three_d_model_generator.generate(blueprint)
        return jsonify({
            'status': 'success',
            'model_path': model_path
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500


@app.route('/generate-model', methods=['POST'])
def api_generate_model():
    user_input = request.json  # Input from frontend
    output_path = "static/raw_model.obj"  # Save the raw model here
    generate_model(user_input, output_path)
    return jsonify({'status': 'success', 'modelPath': output_path})

@app.route('/refine-model', methods=['POST'])
def api_refine_model():
    data = request.json
    input_path = data.get('inputPath')  # Path to raw model
    output_path = data.get('outputPath')  # Save the refined model here

    # Call Blender script
    subprocess.run([
        'blender', '--background', '--python', 'blender_scripts/refine_model.py',
        '--', input_path, output_path
    ], check=True)

    return jsonify({'status': 'success', 'refinedModelPath': output_path})

if __name__ == "__main__":
    app.run(debug=True)
if __name__ == '__main__':
    app.run(debug=True)'''
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import os

app = Flask(__name__)
bcrypt = Bcrypt(app)

# Enable CORS for the frontend (React)
CORS(app, resources={r"/register": {"origins": "http://localhost:3000"}})

# ✅ Use environment variables for sensitive data
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'  # Update with your MySQL username
app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_PASSWORD", "shivani123")  # Use ENV var
app.config['MYSQL_DB'] = 'dreamhome'  # Your database name
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'  # Makes result dictionary-based

mysql = MySQL(app)

# Home Route (Test)
@app.route('/')
def home():
    return jsonify({"message": "Welcome to the 3D Model Generator"})

# Route for user registration
@app.route('/register', methods=['POST'])
def register():
    try:
        # Get JSON data from the request body
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        # Ensure all fields are provided
        if not (name and email and password):
            return jsonify({"message": "All fields are required"}), 400

        cursor = mysql.connection.cursor()

        # ✅ Check if the email already exists
        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            cursor.close()
            return jsonify({"message": "User already registered"}), 409  # 409 = Conflict

        # ✅ Hash password before storing
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # ✅ Insert user into the database
        cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
                       (name, email, hashed_password))
        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "Registration successful"}), 201  # 201 = Created

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

# Route for user login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id, password FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    if user and bcrypt.check_password_hash(user['password'], password):
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"message": "Invalid credentials!"}), 401

# Run Flask app
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)

