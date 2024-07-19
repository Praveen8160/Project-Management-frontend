import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/Authaction.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const logoutuser = async () => {
    dispatch(logout());
  };
  useEffect(() => {
    dispatch(login());
  }, [dispatch]);

  return (
    <div>
      <ToastContainer />
      <header className="bg-neutral-800 fixed top-0 left-0 right-0 z-50 shadow">
        <nav className="h-auto text-white flex flex-row justify-around items-center w-screen-2xl">
          <div className="m-2 lg:m-5 rounded-2xl">
            <Link to="/">
              <img
                src={logo}
                className="lg:mr-3 h-12 rounded-xl"
                alt=""
                srcset=""
              />
            </Link>
          </div>
          <div className="flex flex-row items-center">
            <div className="mr-[0.5rem] lg:mr-[2rem]">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? "text-gray-400" : "text-white"}`
                }
              >
                Dashboard
              </NavLink>
            </div>
          </div>
          <div className="flex flex-row items-center">
            {isAuthenticated ? (
              <div className=" lg:mr-[2rem] border-2 lg:py-2 lg:px-3 p-1 hover:scale-110 rounded-lg hover:border-gray-600">
                <Link to="SignIn" onClick={logoutuser}>
                  Logout
                </Link>
              </div>
            ) : (
              <>
                <div className="lg:mr-[2rem] md:mr-[2rem] mr-2 border-2 lg:py-2 lg:px-3 md:py-2 md:px-3 p-1 hover:scale-110 rounded-lg hover:border-gray-600">
                  <Link to="/SignIn">Login</Link>
                </div>
                <div className="lg:mr-[2rem] md:mr-[2rem] border-2 lg:py-2 lg:px-3 md:py-2 md:px-3 p-1 hover:scale-110 rounded-lg hover:border-gray-600">
                  <Link to="/SignUp">Register</Link>
                </div>
              </>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
