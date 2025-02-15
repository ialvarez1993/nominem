import Nominatim from "nominatim-client";
import PQueue from 'p-queue';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

// Create a client instance with optional configuration
const client = Nominatim.createClient({
    useragent: 'tecservice-sync', // Your application name
    referer: 'http://mywebsite.com', // Your website (optional)
    timeout: 10000, // Request timeout in milliseconds
    endpoint: 'https://nominatim.openstreetmap.org', // Nominatim server endpoint
});

// Define the search options template
const optionsTemplate = {
    countrycodes: 'VE', // Country code for Venezuela
};

async function geocodeAddress(query) {
    const cacheKey = `geocode_${query}`; // Create key by query
    const cachedResult = cache.get(cacheKey); // get the result from key

    const options = { ...optionsTemplate, q: query };

    try {
        if (cachedResult) { // If result exist return it
            return cachedResult;
        }
        const response = await client.search(options);
        cache.set(cacheKey, response); // If not set result in cache
        return response;
    } catch (error) {
        throw new Error('Error in geocodeAddress: ' + error.message);
    }
}

// Example data array
const data = [
    { REFERENCE_DIRECTORY: 'Caracas' },
    { REFERENCE_DIRECTORY: 'Maracaibo' },
    { REFERENCE_DIRECTORY: 'Valencia' },
    { REFERENCE_DIRECTORY: 'San Diego' },
    { REFERENCE_DIRECTORY: 'San Juan de los Morros' },
    { REFERENCE_DIRECTORY: 'Maracay' },
    { REFERENCE_DIRECTORY: 'Naguanagua' },
    { REFERENCE_DIRECTORY: 'Caracas' },
    { REFERENCE_DIRECTORY: 'Maracaibo' },
    { REFERENCE_DIRECTORY: 'Valencia' },
    { REFERENCE_DIRECTORY: 'San Diego' },
    { REFERENCE_DIRECTORY: 'San Juan de los Morros' },
    { REFERENCE_DIRECTORY: 'Maracay' },
    { REFERENCE_DIRECTORY: 'Naguanagua' },
    { REFERENCE_DIRECTORY: 'Caracas' },
    { REFERENCE_DIRECTORY: 'Maracaibo' },
    { REFERENCE_DIRECTORY: 'Valencia' },
    { REFERENCE_DIRECTORY: 'San Diego' },
    { REFERENCE_DIRECTORY: 'San Juan de los Morros' },
    { REFERENCE_DIRECTORY: 'Maracay' },
    { REFERENCE_DIRECTORY: 'Naguanagua' },
    { REFERENCE_DIRECTORY: 'Caracas' },
    { REFERENCE_DIRECTORY: 'Maracaibo' },
    { REFERENCE_DIRECTORY: 'Valencia' },
    { REFERENCE_DIRECTORY: 'San Diego' },
    { REFERENCE_DIRECTORY: 'San Juan de los Morros' },
    { REFERENCE_DIRECTORY: 'Maracay' },
    { REFERENCE_DIRECTORY: 'Naguanagua' },
    { REFERENCE_DIRECTORY: 'Caracas' },
    { REFERENCE_DIRECTORY: 'Maracaibo' },
    { REFERENCE_DIRECTORY: 'Valencia' },
    { REFERENCE_DIRECTORY: 'San Diego' },
    { REFERENCE_DIRECTORY: 'San Juan de los Morros' },
    { REFERENCE_DIRECTORY: 'Maracay' },
    { REFERENCE_DIRECTORY: 'Naguanagua' },
    { REFERENCE_DIRECTORY: 'Caracas' },
    { REFERENCE_DIRECTORY: 'Maracaibo' },
    { REFERENCE_DIRECTORY: 'Valencia' },
    { REFERENCE_DIRECTORY: 'San Diego' },
    { REFERENCE_DIRECTORY: 'San Juan de los Morros' },
    { REFERENCE_DIRECTORY: 'Maracay' },
    { REFERENCE_DIRECTORY: 'Naguanagua' },
    { REFERENCE_DIRECTORY: 'Caracas' },
    { REFERENCE_DIRECTORY: 'Maracaibo' },
    { REFERENCE_DIRECTORY: 'Valencia' },
    { REFERENCE_DIRECTORY: 'San Diego' },
    { REFERENCE_DIRECTORY: 'San Juan de los Morros' },
    { REFERENCE_DIRECTORY: 'Maracay' },
    { REFERENCE_DIRECTORY: 'Naguanagua' },
    { REFERENCE_DIRECTORY: 'Caracas' },
    { REFERENCE_DIRECTORY: 'Maracaibo' },
    { REFERENCE_DIRECTORY: 'Valencia' },
    { REFERENCE_DIRECTORY: 'San Diego' },
    { REFERENCE_DIRECTORY: 'San Juan de los Morros' },
    { REFERENCE_DIRECTORY: 'Maracay' },
    { REFERENCE_DIRECTORY: 'Naguanagua' },
    // Add more items as needed
];

// Create a PQueue instance with a concurrency limit
const queue = new PQueue({ concurrency: 5 }); // Adjust concurrency limit as necessary

// Queue all geocoding tasks
data.forEach(item => {
    queue.add(async () => {
        try {
            const result = await geocodeAddress(item.REFERENCE_DIRECTORY);
            console.log(`Geocoding result for ${item.REFERENCE_DIRECTORY}:`, result);
        } catch (error) {
            console.error(`Error during geocoding for ${item.REFERENCE_DIRECTORY}:`, error);
        }
    });
});

// Wait for all tasks to complete
queue.onIdle().then(() => {
    console.log('All geocoding tasks completed.');
});
