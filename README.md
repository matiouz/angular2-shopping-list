# Quick Start Guide

## 1. Configure API Key in the backend


API_KEY and cosmos db key are defined in local.settings.json:
```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "API_KEY": "<the api key>",
    "COSMOS_ENDPOINT": "https://shopping-list.documents.azure.com:443",
    "COSMOS_KEY": "<the cosmos key>"
  },
  "Host": {
    "CORS": "*"
  },
  "ConnectionStrings": {}
}
```

Open the api folder in devcontainer (so that azure function core tools is installed)
Hit F5 to start the azure function

## 2. Configure Frontend

1. Open the application in your browser
2. Click the config button
3. Enter the API_KEY key
4. Click "Apply" to save

