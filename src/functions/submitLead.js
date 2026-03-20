const { app } = require('@azure/functions');
const { QueueClient } = require('@azure/storage-queue');

const queueName = 'leadsqueue';
const connectionString = process.env.AzureWebJobsStorage;

app.http('submitLead', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            let name = null;
            let email = null;
            let message = null;

            if (request.method === 'GET') {
                name = request.query.get('name');
                email = request.query.get('email');
                message = request.query.get('message');
            } else {
                let body = {};
                try {
                    body = await request.json();
                } catch {
                    body = {};
                }

                name = body.name;
                email = body.email;
                message = body.message;
            }

            if (!name || !email || !message) {
                return {
                    status: 400,
                    body: 'Missing required query/body fields: name, email, message'
                };
            }

            const payload = JSON.stringify({
                name,
                email,
                message,
                submittedAt: new Date().toISOString()
            });

            const queueClient = new QueueClient(connectionString, queueName);

            await queueClient.createIfNotExists();
            await queueClient.sendMessage(payload);

            context.log(`Lead queued: ${name} <${email}>`);

            return {
                status: 200,
                body: `Lead queued for ${name}`
            };
        } catch (err) {
            context.log.error('submitLead failed:', err);
            return {
                status: 500,
                body: `Internal error: ${err.message}`
            };
        }
    }
});