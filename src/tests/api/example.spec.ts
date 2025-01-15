import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
    test('GET /api/example', async ({ request }) => {
        const response = await request.get('/api/example');
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty('key', 'value'); // Adjust based on expected response
    });

    test('POST /api/example', async ({ request }) => {
        const response = await request.post('/api/example', {
            data: { key: 'value' } // Adjust based on your API requirements
        });
        expect(response.status()).toBe(201);
        const data = await response.json();
        expect(data).toHaveProperty('id'); // Adjust based on expected response
    });
});