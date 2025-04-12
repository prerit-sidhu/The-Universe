from flask import Flask, jsonify, send_from_directory
import subprocess
import os
import logging

app = Flask(__name__, static_folder='.')
logging.basicConfig(level=logging.INFO)

# List of planets for which data can be updated
PLANETS = ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']  

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/update-planet-data/<planet>', methods=['POST'])
def update_planet_data(planet):
    if planet.lower() not in PLANETS:
        return jsonify({
            'success': False,
            'message': f'Unknown planet: {planet}'
        }), 404
    
    try:
        # Run the planet's Python script to update the data
        script_path = f"{planet.lower()}.py"
        app.logger.info(f"Running script: {script_path}")
        
        result = subprocess.run(['python', script_path], 
                               capture_output=True, 
                               text=True, 
                               check=True)
        
        return jsonify({
            'success': True,
            'message': f'{planet.capitalize()} data updated successfully',
            'details': result.stdout
        })
    except subprocess.CalledProcessError as e:
        app.logger.error(f"Error updating {planet} data: {e.stderr}")
        return jsonify({
            'success': False,
            'message': f'Error updating {planet} data',
            'error': e.stderr
        }), 500

# Serve static files
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

def initialize_planet_data():
    """Generate initial data for all planets at server startup"""
    # Make sure the data directory exists
    os.makedirs('data', exist_ok=True)
    
    for planet in PLANETS:
        try:
            app.logger.info(f"Generating initial data for {planet}...")
            script_path = f"{planet.lower()}.py"
            
            if os.path.exists(script_path):
                subprocess.run(['python', script_path], check=True)
                app.logger.info(f"Initial {planet} data generated successfully")
            else:
                app.logger.warning(f"Script {script_path} not found, skipping initial data generation")
        except subprocess.CalledProcessError as e:
            app.logger.error(f"Error generating initial {planet} data: {e}")

if __name__ == '__main__':
    # Initialize data for all planets
    initialize_planet_data()
    
    # Start the server
    app.run(debug=True, port=5000)