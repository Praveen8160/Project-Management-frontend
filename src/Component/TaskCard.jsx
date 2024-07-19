import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
function TaskCard({ task, onUpdateStatus }) {
  const [edit, setedit] = useState(false);
  const [status, setstatus] = useState(task.status);
  const editstatus = () => {
    setedit(!edit);
  };
  const updateStatus = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:2020/Task/updateTaskStatus",
        {
          status,
          id,
        },
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        toast.success("Task Status Updated");
        setedit(!edit);
        onUpdateStatus(response.data.updatedtask);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error("try again");
      } else {
        toast.error("try again");
      }
    }
  };
  const handleStatusChange = (e) => {
    setstatus(e.target.value);
  };
  return (
    <>
      <div className="bg-slate-300 shadow-md p-4 border-gray-700 rounded-md mx-4 py-3 mb-7">
        <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
        <p className="text-gray-700 mb-2">{task.description}</p>
        <p className="mb-2">
          <strong>Status</strong>{" "}
          {!edit ? (
            task.status
          ) : (
            <>
              <select value={status} className="rounded-md bg-slate-400" onChange={handleStatusChange}>
                <option value="pending">pending</option>
                <option value="in-progress">in-progress</option>
                <option value="completed">completed</option>
              </select>
              <button
                className="border-2 ml-2"
                onClick={() => updateStatus(task._id)}
              >
                <FaRegEdit size={22} />
              </button>
              <button className="border-2 ml-2" onClick={editstatus}>
                <MdCancel />
              </button>
            </>
          )}
          {!edit && (
            <button className="border-2 ml-2" onClick={editstatus}>
              <FaRegEdit size={22} />
            </button>
          )}
        </p>
        <p className="mb-2">
          <strong>Project:</strong> {task.project.name}
        </p>
        <p className="">
          <strong>Deadline:</strong>{" "}
          {new Date(task.deadline).toLocaleDateString()}
        </p>
      </div>
    </>
  );
}

export default TaskCard;
