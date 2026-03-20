# Azure Functions Lead Processing Demo

A small serverless Azure Functions project built with the Node.js v4 programming model.

## Overview

This project demonstrates a simple business-style workflow using three Azure Functions:

- **submitLead** – HTTP trigger that receives lead data from a browser or client
- **processLead** – Queue trigger that processes lead messages asynchronously
- **dailySummary** – Timer trigger that runs periodically for scheduled background tasks

## Architecture

```text
Client / Browser
      │
      ▼
HTTP Function: submitLead
      │
      ▼
Azure Storage Queue: leadsqueue
      │
      ▼
Queue Function: processLead
      │
      ▼
Business processing / CRM-style workflow

Timer Function: dailySummary
      └── runs on schedule for recurring background tasks
