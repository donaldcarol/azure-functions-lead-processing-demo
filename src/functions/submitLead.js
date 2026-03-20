const { app } = require('@azure/functions');

app.http('submitLead', {
    methods: ['GET','POST'],
    authLevel: 'anonymous',

    extraOutputs: [
        {
            type: 'queue',
            name: 'leadQueue',
            queueName: 'leadsqueue',
            connection: 'AzureWebJobsStorage'
        }
    ],

    handler: async (request, context) => {

        const name = request.query.get('name');
        const email = request.query.get('email');
        const message = request.query.get('message');

        if (!name || !email || !message) {
            return {
                status: 400,
                body: "Missing required parameters"
            };
        }

        const payload = {
            name,
            email,
            message,
            submittedAt: new Date().toISOString()
        };

        context.extraOutputs.set('leadQueue', JSON.stringify(payload));

        context.log(`Lead queued for ${name}`);

        return {
            body: `Lead queued for ${name}`
        };
    }
});