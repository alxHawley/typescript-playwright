export const bookingSchema = {
    type: 'object',
    properties: {
        bookingid: { type: 'number' },
        booking: {
            type: 'object',
            properties: {
                firstname: { type: 'string' },
                lastname: { type: 'string' },
                totalprice: { type: 'number' },
                depositpaid: { type: 'boolean' },
                bookingdates: {
                    type: 'object',
                    properties: {
                        checkin: { type: 'string' },
                        checkout: { type: 'string' }
                    },
                    required: ['checkin', 'checkout']
                }
            },
            required: ['firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates']
        }
    },
    required: ['bookingid', 'booking']
} as const;