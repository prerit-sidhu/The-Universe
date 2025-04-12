document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const distanceAuElement = document.getElementById('distance-au');
    const distanceKmElement = document.getElementById('distance-km');
    const lastUpdatedElement = document.getElementById('last-updated');
    const refreshButton = document.getElementById('refresh-distance');
    
    console.log("uranus.js loaded, checking elements:", {
        distanceAu: !!distanceAuElement,
        distanceKm: !!distanceKmElement,
        lastUpdated: !!lastUpdatedElement,
        refreshButton: !!refreshButton
    });
    
    // Function to fetch uranus distance data
    function fetchuranusDistance() {
        console.log("Fetching uranus distance data...");
        
        // Show loading message in the distance elements
        if (distanceAuElement) distanceAuElement.textContent = "Loading...";
        if (distanceKmElement) distanceKmElement.textContent = "Loading...";
        
        // Fetch data from our JSON file with a cache-busting parameter
        fetch('./data/uranus_distance.json?t=' + new Date().getTime())
            .then(response => {
                console.log("Response status:", response.status);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Data received:", data);
                
                // Update the UI with the fetched data
                if (distanceAuElement) distanceAuElement.textContent = data.distance_au.toFixed(6);
                
                // Format the km value with commas for thousands separators
                const formattedKm = new Intl.NumberFormat().format(data.distance_km);
                if (distanceKmElement) distanceKmElement.textContent = formattedKm;
                
                if (lastUpdatedElement) lastUpdatedElement.textContent = data.timestamp;
                
                console.log("Distance data updated successfully");
            })
            .catch(error => {
                console.error('Error fetching uranus distance data:', error);
                if (distanceAuElement) distanceAuElement.textContent = 'Error';
                if (distanceKmElement) distanceKmElement.textContent = 'Error';
                if (lastUpdatedElement) lastUpdatedElement.textContent = 'Failed to load data';
            });
    }
    
    // Fetch data when page loads
    fetchuranusDistance();
    
    // Add click event to refresh button
    if (refreshButton) {
        console.log("Adding click event to refresh button");
        refreshButton.addEventListener('click', function() {
            console.log("Refresh button clicked");
            
            // First try to update the data via the server
            fetch('/update-planet-data/uranus', { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    console.log("Update response:", data);
                    // Now fetch the updated data
                    fetchuranusDistance();
                })
                .catch(error => {
                    console.warn("Could not trigger server update:", error);
                    // Still try to fetch existing data
                    fetchuranusDistance();
                });
        });
    } else {
        console.error("Refresh button not found in the DOM");
    }
});