import z from "zod";

export const serverEnvSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.string(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

/** Zod will filter all the keys not specified on the schema */
function buildEnv(): ServerEnv {
  try {
    return serverEnvSchema.parse(process.env);
  } catch (error: unknown) {
    const validated = serverEnvSchema.safeParse(error);
    console.error("Warning: invalid server env vars!");
    console.error(validated.error?.flatten().fieldErrors);

    return {} as ServerEnv;
  }
}

export const SERVER_ENV = buildEnv();
