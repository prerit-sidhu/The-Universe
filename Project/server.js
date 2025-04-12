const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for frontend access

// API Route to Fetch Mars' Distance
app.get('/api/mars-distance', async (req, res) => {
    try {
        // Call NASA's JPL Horizons API
        const response = await axios.get('https://ssd.jpl.nasa.gov/api/horizons.api', {
            params: {
                format: 'text',
                COMMAND: '499',  // Mars' ID
                OBJ_DATA: 'NO',
                MAKE_EPHEM: 'YES',
                EPHEM_TYPE: 'OBSERVER',
                CENTER: '500',   // Geocentric (Earth)
                QUANTITIES: '20'
            }
        });

        // Extract the distance in AU (Astronomical Units)
        const data = response.data;
        const match = data.match(/(?<=\$\$SOE[\s\S]*?\n)([\d.]+)\s+AU/);

        if (match && match[1]) {
            const distanceAU = parseFloat(match[1]);
            const distanceKM = distanceAU * 149597870.7; // Convert AU to kilometers

            return res.json({ distance: distanceKM.toFixed(2) });
        }

        res.status(500).json({ error: "Could not retrieve distance data." });
    } catch (error) {
        console.error("Error fetching NASA Horizons API:", error);
        res.status(500).json({ error: "Failed to fetch Mars' distance" });
    }
});

// API Route to Fetch Mercury's Distance
app.get('/api/mercury-distance', async (req, res) => {
    try {
        // Call NASA's JPL Horizons API for Mercury
        const response = await axios.get('https://ssd.jpl.nasa.gov/api/horizons.api', {
            params: {
                format: 'text',
                COMMAND: '199',  // Mercury's ID
                OBJ_DATA: 'NO',
                MAKE_EPHEM: 'YES',
                EPHEM_TYPE: 'OBSERVER',
                CENTER: '500',   // Geocentric (Earth)
                QUANTITIES: '20'
            }
        });

        // Extract the distance in AU (Astronomical Units)
        const data = response.data;
        const match = data.match(/(?<=\$\$SOE[\s\S]*?\n)([\d.]+)\s+AU/);

        if (match && match[1]) {
            const distanceAU = parseFloat(match[1]);
            const distanceKM = distanceAU * 149597870.7; // Convert AU to kilometers

            return res.json({ distance: distanceKM.toFixed(2) });
        }

        res.status(500).json({ error: "Could not retrieve distance data." });
    } catch (error) {
        console.error("Error fetching NASA Horizons API:", error);
        res.status(500).json({ error: "Failed to fetch Mercury's distance" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});