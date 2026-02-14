// This URL will be updated after deployment of the GAS script
const API_URL = 'https://script.google.com/macros/s/AKfycbzfcRj-UOYfywiycg0NI0b5VeuqDppiAI0EA5OrorOktH52MJ29nGtX9EWWbgK1m-uvuA/exec';

export const saveScore = async (name, score, duration) => {
    if (!API_URL) {
        console.warn("API URL not set. Score not saved to backend.");
        return;
    }

    // GAS Web App requires text/plain for CORS usually, or URL encoded. 
    // We'll use simple JSON stringify but headers might need adjustment depending on deployment.
    // Actually, for GAS simpler is often better to avoid preflight issues.

    const data = new URLSearchParams({
        action: 'save',
        name,
        score,
        duration,
    });

    const response = await fetch(API_URL, {
        method: 'POST',
        body: data,
    });

    return response.json();
};

export const getLeaderboard = async () => {
    if (!API_URL) {
        // Return mock data if no API URL
        return [
            { name: 'MOCK_USER_1', score: 300, duration: 120 },
            { name: 'MOCK_USER_2', score: 250, duration: 90 },
            { name: 'MOCK_USER_3', score: 100, duration: 45 },
        ];
    }

    const response = await fetch(`${API_URL}?action=get`);
    return response.json();
};
