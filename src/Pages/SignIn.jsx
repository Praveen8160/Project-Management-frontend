import React, { useEffect, useState } from "react";
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/Authaction.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
function SignIn() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  const Login = async (e) => {
    e.preventDefault();
      try {
        const response = await axios.post(
          "https://project-management-backend-v16g.onrender.com/User/Signin",
          {
            email: credentials.email,
            password: credentials.password,
          },
          { withCredentials: true },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status == 200) {
          dispatch(login());
          toast.success("Successfully Login ");
          navigate("/");
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          toast.info("try again");
        } else {
          toast.error("Invalid Email or Password");
        }
    }
  };
  const onchange = (e) => {
    const { name, value } = e.target;
    setcredentials({ ...credentials, [name]: value });
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  });
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex lg:flex-row flex-col items-center shadow-2xl w-auto lg:mt-20 overflow-hidden">
        <div>
          <img
            src="https://cdn.technologyadvice.com/wp-content/uploads/2019/05/How-Using-JIRA-For-Project-Management-Can-Make-Any-Team-More-Productive-01.png"
            alt=""
            className="lg:h-[50rem] h-72 md:h-[30rem] rounded-full"
          />
        </div>
        <div className="-mt-20 md:mt-9 lg:mt-2">
          <div className="flex flex-row items-center text-wrap invisible lg:visible md:visible">
            <img src={logo} alt="" />
            <h1 className="text-4xl">Project Management</h1>
          </div>
          <div className="lg:ml-9 ml-4 lg:my-8">
            <h1 className="text-3xl">Login Your Account</h1>
            <p>
              Not registered yet ? {""}
              <Link to="/SignUp" className="font-bold">
                Sign Up
              </Link>
            </p>
          </div>
          <form
            className="flex flex-col lg:mt-20 lg:ml-9 mx-3"
            onSubmit={Login}
          >
            <input
              type="email"
              name="email"
              id=""
              value={credentials.email}
              onChange={onchange}
              className="h-10 rounded-lg border-2 border-gray-600 mt-5"
              placeholder="Enter Your Email"
            />
            <input
              type="password"
              name="password"
              id=""
              value={credentials.password}
              onChange={onchange}
              className="h-10 rounded-lg border-2 border-gray-600 mt-5"
              placeholder="********"
            />
            <button className="border-2 rounded-lg mt-8 py-3 bg-gray-800 hover:bg-gray-600 text-white">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
