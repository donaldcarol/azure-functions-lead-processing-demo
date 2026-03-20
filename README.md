# Azure Functions Lead Processing Demo

This project demonstrates a simple serverless business workflow built with Azure Functions.

## Architecture

- **submitLead**: HTTP-triggered function that accepts lead data from a web request
- **processLead**: Queue-triggered function that processes lead messages asynchronously
- **dailySummary**: Timer-triggered function that runs periodically for housekeeping or reporting

## Flow

Browser

   │
   
   ▼

HTTP Function
 submitLead
 
   │
   
   ▼

Azure Storage Queue

   │
   
   ▼

Queue Function
 processLead
 
   │
   
   ▼

Business logic

1. A client sends lead data to the HTTP endpoint
2. The function validates the input and writes it to Azure Queue Storage
3. A queue-triggered function picks up the message and simulates business processing
4. A timer-triggered function runs on schedule for operational tasks

## Technologies

- Azure Functions (Node.js v4 programming model)
- Azure Storage Queue
- JavaScript
- Kudu / Zip Deploy / Azure portal

## Example request

GET:

`/api/submitLead?name=Donald&email=donald@example.com&message=Interested%20in%20Azure%20automation`

## Notes

This project is intended as a practical Azure serverless learning lab and portfolio demo.
