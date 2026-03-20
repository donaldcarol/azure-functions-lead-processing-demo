const { app } = require('@azure/functions');

app.storageQueue('processLead', {
    queueName: 'leadsqueue',
    connection: 'AzureWebJobsStorage',

    handler: async (queueItem, context) => {

        const lead = JSON.parse(queueItem);

        context.log(`Processing lead`);
        context.log(`Name: ${lead.name}`);
        context.log(`Email: ${lead.email}`);
        context.log(`Message: ${lead.message}`);
        context.log(`Submitted at: ${lead.submittedAt}`);

        context.log(`Lead processed successfully`);
    }
});