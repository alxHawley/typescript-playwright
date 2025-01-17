import { test, expect } from '@playwright/test';
import { config } from '../../../utils/config';
import { bookingSchema } from '../../../utils/schemas/booking.schema';
import Ajv from 'ajv';

const ajv = new Ajv();

test.describe('API Tests', () => {
    test('should create a booking', async ({ request }) => {
        const response = await request.post(`${config.baseUrl}/${config.endpoints.booking}`, {
            data: {
                firstname: 'Jim',
                lastname: 'Brown',
                totalprice: 111,
                depositpaid: true,
                bookingdates: {
                    checkin: '2024-01-01',
                    checkout: '2024-01-02'
                }
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        const validate = ajv.compile(bookingSchema);
        expect(validate(responseBody)).toBeTruthy();
    });
});