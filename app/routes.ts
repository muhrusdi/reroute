import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/layout.tsx", [
    index("./routes/home.tsx"),
    route("/blogs", "./routes/blogs/index.tsx"),
    route("/form", "./routes/form.tsx"),
  ]),
] satisfies RouteConfig;
