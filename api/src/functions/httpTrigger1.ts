import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import * as fs from "fs";
import { CosmosClient } from "@azure/cosmos";
import { getConfig } from "../config";

export async function shoppingList(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  // Check authentication
  const authResult = checkAuthentication(request);
  if (!authResult.authenticated) {
    context.log(`Authentication failed: ${authResult.reason}`);
    return {
      status: 401,
      body: JSON.stringify({
        message: "Unauthorized",
        details: authResult.reason,
      }),
    };
  }

  if (request.method === "GET") {
    return handleGet(request, context);
  } else if (request.method === "PUT") {
    return handlePut(request, context);
  }
}

// http://localhost:7071/api/lists/{id}
app.http("shoppingList", {
  methods: ["GET", "PUT"],
  route: "lists/{id}",
  authLevel: "function",
  handler: shoppingList,
});

const cosmosEndpoint = process.env.COSMOS_ENDPOINT;
const cosmosKey = process.env.COSMOS_KEY;
const databaseId = "ShoppingListDatabase";
const containerId = "ShoppingListContainer";
const client = new CosmosClient({ endpoint: cosmosEndpoint, key: cosmosKey });
const partitionKey = "id";

interface AuthResult {
  authenticated: boolean;
  reason: string;
}

function checkAuthentication(request: HttpRequest): AuthResult {
  const config = getConfig();

  // Get API key from header
  const apiKey = request.headers.get("X-API-Key");

  if (!apiKey) {
    return { authenticated: false, reason: "Missing X-API-Key header" };
  }

  // Compare with configured API key
  if (apiKey !== config.apiKey) {
    return { authenticated: false, reason: "Invalid API key" };
  }

  return { authenticated: true, reason: "" };
}

async function handleGet(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const resourceId = request.params.id;

  try {
    interface Item {
      id: string;
      payload: string;
    }

    const { resource } = await client
      .database(databaseId)
      .container(containerId)
      .item(resourceId, resourceId)
      .read<Item>();

    if (!resource) {
      return { status: 404, body: '{"message": "Item not found"}' };
    }

    return { body: JSON.stringify(resource.payload) };
  } catch (err) {
    return { status: 500, body: '{"message": "error reading from Cosmos DB"}' };
  }
}

async function handlePut(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const resourceId = request.params.id;
  const payload = JSON.parse(await request.text());

  try {
    await client
      .database(databaseId)
      .container(containerId)
      .items.upsert({ id: resourceId, payload });
    console.log("Data successfully saved to Cosmos DB");
    return { body: '{"message": "Data successfully saved to Cosmos DB"}' };
  } catch (err) {
    console.log("Error trying to save data to Cosmos DB");
    console.log(err);
    return {
      status: 500,
      body:
        '{"message": "error writing to Cosmos DB", "details": "' + err + '"}',
    };
  }
}
