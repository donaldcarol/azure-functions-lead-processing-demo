const { app } = require('@azure/functions');

app.storageQueue('processLead', {
    queueName: 'leadsqueue',
    connection: 'AzureWebJobsStorage',
    handler: async (queueItem, context) => {
        try {
            const lead = typeof queueItem === 'string'
                ? JSON.parse(queueItem)
                : queueItem;

            context.log('=== PROCESSLEAD START ===');
            context.log(`Name: ${lead.name}`);
            context.log(`Email: ${lead.email}`);
            context.log(`Message: ${lead.message}`);
            context.log(`Submitted at: ${lead.submittedAt}`);
            context.log('=== PROCESSLEAD END ===');
        } catch (err) {
            context.log.error('processLead failed:', err);
            throw err;
        }
    }
});