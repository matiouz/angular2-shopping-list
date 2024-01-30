import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import * as fs from "fs";

export async function shoppingList(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

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
    return { status: 500, body: "error reading file" };
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
    return { body: "File successfully saved" };
  } catch (err) {
    console.log("Error trying to save file " + filePath);
    console.log(err);
    return { status: 500, body: "error writing file" };
  }
}
