export const config = {
    baseUrl: process.env.BASE_URL || 'http://localhost:3001',
    endpoints: {
        booking: 'booking',
        auth: 'auth'
    }
};

export const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

export const getAuthHeaders = (token: string) => ({
    "Content-Type": "application/json",
    "Accept": "application/json",
    'Cookie': `token=${token}`
});