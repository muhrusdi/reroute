import { PrismaClient } from "../../../prisma/generated";
import { withAccelerate } from "@prisma/extension-accelerate";
import { SERVER_ENV } from "~/lib/env/env-flags.server";

function buildClient() {
  const client = new PrismaClient().$extends(withAccelerate());

  return client;
}

/**
 * The type of the PrismaClient with extensions
 */
export type PrismaClientType = ReturnType<typeof buildClient>;

let prisma: PrismaClientType;

declare global {
  var __prisma: PrismaClientType | undefined;
}

// This is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (SERVER_ENV.NODE_ENV === "production") {
  prisma = buildClient();
  prisma.$connect();
} else {
  if (!global.__prisma) {
    global.__prisma = buildClient();
    global.__prisma.$connect();
  }
  prisma = global.__prisma;
}

export default prisma;
