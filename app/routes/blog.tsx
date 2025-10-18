import { wait } from "~/lib/utils";
import type { Route } from "./+types/blog";
import { Suspense } from "react";
import { Await } from "react-router";
const WaitComponent = async () => {
  await wait(4000);
  return <p>Wait rsc</p>;
};

export const loader = async () => {
  const waiting = async () => {
    await wait(4000);
    return <p>Hello rsc</p>;
  };
  return {
    message: "Hello from the blog loader!",
    el: <div>This is a React element from the loader.</div>,
    waiting: waiting(),
  };
};

export function ServerComponent({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Blog</h1>
      <Suspense fallback={<li>Loading...</li>}>
        <Await resolve={loaderData.waiting}>{(data) => <li>{data}</li>}</Await>
      </Suspense>
      <Suspense fallback={<li>Loading...</li>}>
        <WaitComponent />
      </Suspense>
      {/* <p>{loaderData.waiting}</p> */}
      <h3>{loaderData.message}</h3>
      {loaderData.el}
    </div>
  );
}
