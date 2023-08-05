import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, Link } from "react-router-dom";
import Home from './Home';
import About from './components/SearchImages';
import './index.css'

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/quotes">My Quotes</Link>
          </li>
          <li>
            <Link to="/goals">Goals</Link>
          </li>
          <li>
            <Link to="/images">Images</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;