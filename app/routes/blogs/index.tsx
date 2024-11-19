import { pending } from "~/lib/utils";
import { Route } from "../blogs/+types.index";
import { Await } from "react-router";
import { Suspense } from "react";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const loader = async () => {
  const dataPromise = async () => {
    const data = await fetch(
      "http://localhost:5173/api/jsonplaceholder/posts"
    ).then((response) => response.json());

    await pending(3000);

    return data as Post[];
  };

  const data = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts").then(
      (response) => response.json()
    );

    return data as Post[];
  };

  return {
    dataPromise: dataPromise(),
    data: await data(),
  };
};

const Blogs = ({ loaderData }: Route.ComponentProps) => {
  const { dataPromise, data } = loaderData;

  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          <ul className="border">
            {data.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
        <div className="w-1/2">
          <div className="border">
            <ul>
              <Suspense fallback="Loading...">
                <Await resolve={dataPromise}>
                  {(value: Post[]) =>
                    value.map((item) => <li key={item.id}>{item.title}</li>)
                  }
                </Await>
              </Suspense>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
