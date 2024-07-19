import React from "react";
import logo from "../assets/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const Register = async (data) => {
 
    try {
      const response = await axios.post(
        "https://project-management-backend-v16g.onrender.com/User/Signup",
        {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Registration successful. Login Your Account!");
        navigate("/SignIn")
      }
    } catch (error) {
      // console.log(error.response);
      if (error.response && error.response.status === 400) {
        toast.info("Enter unique email or username");
      } else {
        toast.error("Please try again.");
      }
    }
  };
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
            <h1 className="text-3xl">Register Your Account</h1>
            <p>
              Already have an Account ? {""}
              <Link to="/SignIn" className="font-bold">
                Sign in
              </Link>
            </p>
          </div>
          <form
            className="flex flex-col lg:mt-20 lg:ml-9 mx-3"
            onSubmit={handleSubmit(Register)}
          >
            <input
              type="text"
              name=""
              id=""
              className="h-10 rounded-lg border-2 border-gray-600 mt-5"
              placeholder="Enter Your Name"
              {...register("username", { required: "Enter your Name" })}
            />
            {errors.username && (
              <p className="text-red-700">{errors.username.message}</p>
            )}
            <input
              type="email"
              name=""
              id=""
              className="h-10 rounded-lg border-2 border-gray-600 mt-5"
              placeholder="Enter Your Email"
              {...register("email", { required: "Enter your email" })}
            />
            {errors.email && (
              <p className="text-red-700">{errors.email.message}</p>
            )}
            <input
              type="password"
              name=""
              id=""
              className="h-10 rounded-lg border-2 border-gray-600 mt-5"
              placeholder="********"
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Password length should be more than 5",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-700">{errors.password.message}</p>
            )}
            <button className="border-2 rounded-lg mt-8 py-3 bg-gray-800 hover:bg-gray-600 text-white">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
