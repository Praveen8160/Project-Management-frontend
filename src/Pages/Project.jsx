import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { GrAdd } from "react-icons/gr";
import ModalTask from "../Component/ModalTask";
import Loader from "../Component/Loader";

function Project() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const singleProject = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:2020/Project/getSingleProject/${id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setProject(response.data.singleProject);
      }
    } catch (error) {
      console.log("server error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    singleProject();
  }, [isModalOpen]);

  return (
    <div className="flex bg-slate-400 h-screen justify-center items-center">
      <div className="bg-slate-600 rounded-2xl min-h-[40rem] w-full sm:w-11/12 mx-5 md:w-4/5 lg:w-3/5 xl:w-2/3">
        {loading ? (
          <Loader></Loader>
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center my-2">
              {project.name}
            </h1>
            <hr />
            <p className="text-sm sm:text-lg m-3">{project.description}</p>
            <hr />
            <div className="flex flex-col">
              <div className="flex m-4 items-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 lg:py-4 lg:px-7 rounded"
                  onClick={handleOpenModal}
                >
                  <GrAdd />
                </button>
                {isModalOpen && (
                  <ModalTask onClose={handleCloseModal} pid={id} />
                )}
                <h1 className="text-sm sm:text-lg font-semibold ml-3">
                  Add Task
                </h1>
              </div>
              {project.tasks && project.tasks.length === 0 ? (
                <p className="text-2xl text-center mt-12 text-white">
                  0 Task Assigned
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 lg:gap-14 mx-3">
                  {project.tasks &&
                    project.tasks.map((item) => (
                      <div
                        key={item._id}
                        className="bg-slate-300 shadow-md p-4 border-gray-700 rounded-md"
                      >
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-700 mb-2">{item.description}</p>
                        <p className="mb-2">
                          <strong>Status:</strong> {item.status}
                        </p>
                        <p className="mb-2">
                          <strong>Assigned To:</strong>{" "}
                          {item.assignedTo.username}
                        </p>
                        <p>
                          <strong>Deadline:</strong>{" "}
                          {new Date(item.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Project;
