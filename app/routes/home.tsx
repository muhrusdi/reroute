import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { wait } from "~/lib/utils";
import { Suspense } from "react";
import { Await } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const loader = async () => {
  const waiting = async () => {
    await wait(4000);
    return <p>Hello from rsc!</p>;
  };
  return {
    waiting: waiting(),
    message: "Hello from the home loader!",
  };
};

export function ServerComponent({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <ul>
        <Suspense fallback={<li>Loading...</li>}>
          <Await resolve={loaderData.waiting}>
            {(data) => <li>{data}</li>}
          </Await>
        </Suspense>
        {/* <li>{loaderData.waiting}</li> */}
        <li>{loaderData.message}</li>
      </ul>
      <Welcome />
    </div>
  );
}
