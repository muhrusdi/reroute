import { PropsWithChildren } from "react";
import { Link, Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <nav>
        <ul className="flex space-x-3">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">blogs</Link>
          </li>
          <li>
            <Link to="/form">Form</Link>
          </li>
        </ul>
      </nav>
      <Outlet context={{ data: 2 }} />
    </div>
  );
};

export default RootLayout;
