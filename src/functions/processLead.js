const { app } = require('@azure/functions');

app.storageQueue('processLead', {
    queueName: 'leadsqueue',
    connection: 'AzureWebJobsStorage',
    handler: async (queueItem, context) => {
        try {
            const lead = JSON.parse(queueItem);

            context.log(`Processing lead from ${lead.name}`);
            context.log(`Email: ${lead.email}`);
            context.log(`Message: ${lead.message}`);
            context.log(`Submitted at: ${lead.submittedAt}`);
        } catch (err) {
            context.log.error('processLead failed:', err);
            throw err;
        }
    }
});