import React, { useEffect, useState } from "react";
import Modal from "../Component/Modal";
import { GrAdd } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import ProjectCard from "../Component/ProjectCard";
import TaskCard from "../Component/TaskCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { MdTry } from "react-icons/md";
import Loader from "../Component/Loader";
function DashBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [projects, setprojects] = useState([]);
  const [task, settask] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setloading] = useState(true);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const allProjects = async () => {
    try {
      setloading(true);
      const response = await axios.get(
        "http://localhost:2020/Project/allProject",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setprojects(response.data.Projects);
      }
    } catch (error) {
    } finally {
      setloading(false);
    }
  };
  const allTasks = async () => {
    try {
      setloading(true);
      const response = await axios.get(
        "http://localhost:2020/Task/getAllTask",
        { withCredentials: true }
      );
      // console.log(response.data);
      if (response.status === 200) {
        settask(response.data.tasks);
      }
    } catch (error) {
    } finally {
      setloading(false);
    }
  };
  const updateTaskStatus = (updatedTask) => {
    settask((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id
          ? { ...task, status: updatedTask.status }
          : task
      )
    );
  };
  const deleteProject = (projectId) => {
    setprojects((prevProjects) =>
      prevProjects.filter((project) => project._id !== projectId)
    );
    allTasks();
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/SignIn");
    } else {
      allProjects();
      allTasks();
    }
  }, [isModalOpen, isAuthenticated]);
  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div className="min-h-screen bg-slate-400">
          <div className="p-2">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-3xl  mb-4 font-bold font-serif">
                Add Project
              </h1>
              <button
                onClick={handleOpenModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-7 rounded"
              >
                <GrAdd />
              </button>
            </div>
            {isModalOpen && <Modal onClose={handleCloseModal} />}
          </div>
          <div className="bg-slate-600 lg:mx-32 mx-5 mb-10 rounded-lg min-h-80">
            <h1 className="text-3xl mb-4 font-bold font-serif text-center pt-2">
              Your Projects
            </h1>
            {projects.length === 0 ? (
              <div className="flex flex-col justify-center items-center gap-4">
                <p className="text-2xl mt-12 text-white">
                  No projects available
                </p>
                <button
                  onClick={handleOpenModal}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-7 rounded"
                >
                  Add Project
                </button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-14">
                {projects.map((value) => (
                  <ProjectCard
                    key={value._id}
                    project={value}
                    onDelete={deleteProject}
                  ></ProjectCard>
                ))}
              </div>
            )}
          </div>
          <div className="bg-slate-600  mx-5 lg:mx-32 rounded-lg min-h-80">
            <h1 className="text-3xl mb-4 font-bold font-serif text-center pt-2">
              Your Tasks
            </h1>
            {task.length === 0 ? (
              <p className="text-2xl mt-12 text-center text-white">
                No Task available
              </p>
            ) : (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-14">
                {task.map((item) => (
                  <TaskCard
                    task={item}
                    onUpdateStatus={updateTaskStatus}
                  ></TaskCard>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default DashBoard;
