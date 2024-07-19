import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdCancel, MdCleanHands } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
function ModalTask({ onClose, pid }) {
  const [user, setuser] = useState([]);
  const [value, setvalue] = useState({
    pname: "",
    description: "",
    Assigned: "",
    deadline: "",
  });
  const getAllUser = async () => {
    try {
      const response = await axios.get("http://localhost:2020/User/allUser", {
        withCredentials: true,
      });
      // console.log(response.data);
      setuser(response.data);
      if (response.data.length > 0) {
        setvalue((prev) => ({ ...prev, Assigned: response.data[0]._id }));
      }
    } catch (error) {}
  };
  const addtask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2020/Task/addTask",
        {
          title: value.pname,
          description: value.description,
          assignedTo: value.Assigned,
          project: pid,
          deadline: value.deadline,
        },
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        alert("Task Assigned")
        setvalue({ pname: "", description: "", Assigned: "", deadline: "" });
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert("try again");
      } else {
        alert("try again");
      }
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setvalue((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    getAllUser();
  }, []);
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-400 p-6 rounded-lg shadow-lg lg:w-[30rem] md:w-[30rem] w-80">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Add Task</h2>
          <button onClick={onClose} className="text-red-900 font-bold rounded">
            <MdCancel size={29} />
          </button>
        </div>
        <hr />
        <form className="flex flex-col items-center mt-4 " onSubmit={addtask}>
          Task name
          <input
            name="pname"
            type="text"
            className="h-9 rounded-md placeholder:p-1 placeholder:text-gray-700  border-2 mb-3 border-gray-600 lg:w-80 md:w-80"
            placeholder="Enter Project Name"
            required
            value={value.pname}
            onChange={onChange}
          />
          Description
          <textarea
            name="description"
            className="rounded-md placeholder:p-1 placeholder:text-gray-700 border-2 mb-3 border-gray-600 lg:w-80 md:w-80"
            id=""
            cols="10"
            rows="3"
            placeholder="Description"
            required
            value={value.description}
            onChange={onChange}
          ></textarea>
          Assign To
          <select
            className="rounded-md placeholder:p-1 placeholder:text-gray-700 border-2 mb-3 border-gray-600 lg:w-80 md:w-80"
            value={value.Assigned}
            onChange={onChange}
            name="Assigned"
          >
            {user.map((item) => (
              <>
                <option key={item._id} value={item._id}>
                  {item.username}
                </option>
              </>
            ))}
          </select>
          Deadline
          <input
            className="rounded-md placeholder:p-1 placeholder:text-gray-700 border-2 mb-3 border-gray-600 lg:w-80 md:w-80"
            type="date"
            name="deadline"
            id=""
            required
            value={value.date}
            onChange={onChange}
          />
          <button className="border-2 py-3 px-5 font-bold  border-gray-700 rounded-md bg-blue-500 hover:bg-blue-700 hover:scale-105">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalTask;
