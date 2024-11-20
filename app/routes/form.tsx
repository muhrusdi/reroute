import { Await, Form, useActionData, useNavigation } from "react-router";
import { Route } from "./+types.form";
import { z } from "zod";
import { Suspense, useRef } from "react";
import prisma from "~/lib/utils/prisma.server";
import { createQuote } from "../../prisma/utils";
import { pending } from "~/lib/utils";

const schema = z.object({
  quote: z.string(),
});

export const loader = async () => {
  const data = async () => {
    await pending(3000);
    return prisma.quotes.findMany();
  };

  return { data: data() };
};

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const validatedFields = schema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = await createQuote(validatedFields.data.quote);

  return {
    status: "success",
    data,
  };
};

const FormPage = ({ loaderData }: Route.ComponentProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { data } = loaderData;
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  const busy = navigation.state === "submitting";

  if (navigation.state === "idle" && actionData?.status === "success") {
    formRef.current?.reset();
  }

  return (
    <div>
      <div className="flex">
        <div className="w-1/2 border">
          <Suspense fallback="Loading...">
            <ul>
              <Await resolve={data}>
                {(data) =>
                  data.map((item: { id: string; quote: string }) => (
                    <li key={item.id}>{item.quote}</li>
                  ))
                }
              </Await>
            </ul>
          </Suspense>
        </div>
        <div className="w-1/2 border">
          <Form ref={formRef} method="post">
            <div className="space-y-2">
              <div>
                <textarea aria-label="quote" name="quote" />
              </div>
              <div>
                <button type="submit">{busy ? "Saving..." : "Submit"}</button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
