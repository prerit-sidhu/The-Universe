document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const distanceAuElement = document.getElementById('distance-au');
    const distanceKmElement = document.getElementById('distance-km');
    const lastUpdatedElement = document.getElementById('last-updated');
    const refreshButton = document.getElementById('refresh-distance');
    const loadingElement = document.querySelector('.loading');
    const distanceValueElement = document.querySelector('.distance-value');
    
    // Initially hide the distance values and show loading
    distanceValueElement.style.display = 'none';
    loadingElement.style.display = 'block';
    
    // Function to fetch Mercury distance data
    function fetchMercuryDistance() {
        // Show loading, hide values
        loadingElement.style.display = 'block';
        distanceValueElement.style.display = 'none';
        
        // Fetch data from our JSON file (which is updated by mercury.py)
        fetch('/data/mercury_distance.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Update the UI with the fetched data
                distanceAuElement.textContent = data.distance_au.toFixed(6);
                
                // Format the km value with commas for thousands separators
                const formattedKm = new Intl.NumberFormat().format(data.distance_km);
                distanceKmElement.textContent = formattedKm;
                
                lastUpdatedElement.textContent = data.timestamp;
                
                // Hide loading, show values
                loadingElement.style.display = 'none';
                distanceValueElement.style.display = 'block';
            })
            .catch(error => {
                console.error('Error fetching Mercury distance data:', error);
                distanceAuElement.textContent = 'Error';
                distanceKmElement.textContent = 'Error';
                lastUpdatedElement.textContent = 'Failed to load data';
                
                // Hide loading, show values (with error)
                loadingElement.style.display = 'none';
                distanceValueElement.style.display = 'block';
            });
    }
    
    // Fetch data when page loads
    fetchMercuryDistance();
    
    // Add click event to refresh button
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            fetchMercuryDistance();
        });
    }
});