// Modal.js
import React from "react";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import axios from "axios";
const Modal = ({ onClose }) => {
  const [value, setvalue] = useState({
    pname: "",
    description: "",
  });
  const addProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2020/Project/addProject",
        {
          name: value.pname,
          description: value.description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("project added");
        setvalue({ pname: "", description: "" });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("invalid credentials");
      } else {
        alert("try again");
      }
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setvalue((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-400 p-6 rounded-lg shadow-lg lg:w-[30rem] md:w-[30rem] w-80">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Add Project</h2>
          <button onClick={onClose} className="text-red-900 font-bold rounded">
            <MdCancel size={29} />
          </button>
        </div>
        <hr />
        <form className="flex flex-col items-center mt-4" onSubmit={addProject}>
          <input
            name="pname"
            type="text"
            className="h-9 rounded-md placeholder:p-1 placeholder:text-gray-700  border-2 mb-5 border-gray-600 lg:w-80 md:w-80"
            placeholder="Enter Project Name"
            required
            value={value.pname}
            onChange={onChange}
          />
          <textarea
            name="description"
            className="rounded-md placeholder:p-1 placeholder:text-gray-700 border-2 mb-5 border-gray-600 lg:w-80 md:w-80"
            id=""
            cols="22"
            rows="10"
            placeholder="Description"
            required
            value={value.description}
            onChange={onChange}
          ></textarea>
          <button className="border-2 py-3 px-5 font-bold  border-gray-700 rounded-md bg-blue-500 hover:bg-blue-700 hover:scale-105">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
