import { test, expect } from '@playwright/test';
import { config, headers, getAuthHeaders } from '../../../utils/config';
import { bookingSchema } from '../../../utils/schemas/booking.schema';
import Ajv from 'ajv';

const ajv = new Ajv();

interface BookingDates {
    checkin: string;
    checkout: string;
}

interface BookingData {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: BookingDates;
    additionalneeds?: string;
}

test.describe('API CRUD Tests', () => {
    let bookingId: number;
    let bookingData: BookingData;
    let authToken: string;

    test.beforeAll(async ({ request }) => {
        // Get auth token
        const authResponse = await request.post(`${config.baseUrl}/${config.endpoints.auth}`, {
            data: {
                username: 'admin',
                password: 'password123'
            }
        });
        const authData = await authResponse.json();
        authToken = authData.token;
    });

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
            headers: headers
        });

        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        const validate = ajv.compile(bookingSchema);
        expect(validate(responseBody)).toBeTruthy();
        bookingId = responseBody.bookingid;
        bookingData = responseBody.booking;
    });

    test('should get a booking', async ({ request }) => {
        const response = await request.get(`${config.baseUrl}/${config.endpoints.booking}/${bookingId}`);
        expect(response.ok()).toBeTruthy();
        const booking = await response.json();
        expect(booking.firstname).toBe(bookingData.firstname);
    });

    test('should update a booking', async ({ request }) => {
        const updateData: BookingData = {
            firstname: 'James',
            lastname: 'Brown',
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: '2024-01-01',
                checkout: '2024-01-02'
            }
        };

        const response = await request.put(`${config.baseUrl}/${config.endpoints.booking}/${bookingId}`, {
            data: updateData,
            headers: getAuthHeaders(authToken)
        });

        expect(response.ok()).toBeTruthy();
        const updated = await response.json();
        expect(updated.firstname).toBe('James');
    });

    test('should delete a booking', async ({ request }) => {
        const response = await request.delete(`${config.baseUrl}/${config.endpoints.booking}/${bookingId}`, {
            headers: getAuthHeaders(authToken)
        });

        expect(response.status()).toBe(201);
    });
});