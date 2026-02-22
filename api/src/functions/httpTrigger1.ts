import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import * as fs from "fs";
import { getConfig } from "../config";

export async function shoppingList(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  // Check authentication
  const authResult = checkAuthentication(request);
  if (!authResult.authenticated) {
    context.log(`Authentication failed: ${authResult.reason}`);
    return {
      status: 401,
      body: JSON.stringify({ message: "Unauthorized", details: authResult.reason }),
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

var FILES_PATH = "./resources/";

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
  context: InvocationContext
): Promise<HttpResponseInit> {
  console.log(request.params);

  const resourceId = request.params.id;
  const filePath = FILES_PATH + resourceId;

  try {
    var file = await fs.promises.readFile(filePath);

    return { body: file };
  } catch (err) {
    return { status: 500, body: '{"message": "error reading file"}' };
  }
}

async function handlePut(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const resourceId = request.params.id;
  const filePath = FILES_PATH + resourceId;

  try {
    await fs.promises.writeFile(filePath, await request.text());
    console.log("File successfully saved " + filePath);
    return { body: '{"message": "File successfully saved"}' };
  } catch (err) {
    console.log("Error trying to save file " + filePath);
    console.log(err);
    return { status: 500, body: '{"message": "error writing file"}' };
  }
}
