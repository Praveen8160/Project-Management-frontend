import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function ProjectCard({ project, onDelete }) {
  const deleteproject = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:2020/Project/deleteProject/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Project deleted successfully");
        onDelete(id);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Failed to delete project");
    }
  };
  return (
    <>
      <div className="bg-slate-300 border-2 flex flex-col items-center border-gray-700 rounded-md mx-4 py-3 mb-7">
        <h1 className="text-xl font-bold">{project.name}</h1>
        <p className="mx-4 my-2">{project.description}</p>
        <div className="my-5">
          <Link
            to={`/project/${project._id}`}
            className="border-2 py-3 px-5 mx-3 font-bold border-gray-700 rounded-md bg-blue-500 hover:bg-blue-700 hover:scale-105"
          >
            Visit
          </Link>
          <Link
            to="/"
            className="border-2 py-3 px-5 font-bold border-gray-700 rounded-md bg-red-500 hover:bg-red-700 hover:scale-105"
            onClick={() => deleteproject(project._id)}
          >
            Delete
          </Link>
        </div>
      </div>
    </>
  );
}

export default ProjectCard;
