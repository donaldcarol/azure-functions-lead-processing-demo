const { app } = require('@azure/functions');

app.timer('dailySummary', {
    schedule: '0 */5 * * * *',

    handler: (myTimer, context) => {

        context.log("Daily summary job running...");
    }
});