from astroquery.jplhorizons import Horizons
from astropy.time import Time
import datetime
import json
import os

def get_jupiter_distance():
    """
    Fetch real-time distance data for jupiter from Earth using NASA's JPL Horizons API
    Returns distance in AU and km, along with timestamp
    """
    try:
        # Get the current time in Julian Date
        current_jd = Time.now().jd
        
        # Query Horizons API (299 is jupiter's NAIF ID, 399 is Earth)
        target = Horizons(id='599', location='399', epochs=current_jd)
        vector_data = target.vectors()
        
        # Extract distance (range) in AU and convert to kilometers
        distance_au = float(vector_data['range'][0])
        au_to_km = 149597870.7  # Conversion factor: 1 AU = 149,597,870.7 km
        distance_km = distance_au * au_to_km
        
        # Get current timestamp
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        # Create result dictionary
        result = {
            "distance_au": round(distance_au, 6),
            "distance_km": round(distance_km, 2),
            "timestamp": timestamp
        }
        
        # Create absolute path to the project directory
        project_dir = r"c:\Users\preri\OneDrive\Desktop\Project"
        data_dir = os.path.join(project_dir, 'data')
        
        # Ensure data directory exists
        os.makedirs(data_dir, exist_ok=True)
        
        # Save to JSON file for the web page to access
        json_path = os.path.join(data_dir, 'jupiter_distance.json')
        with open(json_path, 'w') as f:
            json.dump(result, f)
            
        print(f"jupiter distance data updated: {distance_au:.6f} AU ({distance_km:,.2f} km)")
        print(f"Data saved to: {json_path}")
        
        # Verify file was created
        if os.path.exists(json_path):
            print(f"File size: {os.path.getsize(json_path)} bytes")
            # Read back the file to verify content
            with open(json_path, 'r') as f:
                content = f.read()
                print(f"File content: {content}")
        else:
            print("Warning: File was not created successfully")
            
        return result
        
    except Exception as e:
        print(f"Error fetching jupiter distance data: {str(e)}")
        return {
            "distance_au": None,
            "distance_km": None,
            "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "error": str(e)
        }

if __name__ == "__main__":
    # Get and print jupiter distance data
    data = get_jupiter_distance()
    
    if data["distance_au"] is not None:
        print("\nReal-time distance from Earth to jupiter:")
        print(f"{data['distance_au']:.6f} AU")
        print(f"{data['distance_km']:,.2f} km")
        print(f"Data timestamp: {data['timestamp']}")
    else:
        print(f"Failed to retrieve jupiter distance data: {data.get('error', 'Unknown error')}")








