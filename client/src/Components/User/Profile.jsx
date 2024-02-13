import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditPic from "./EditPic";
import UpdatePassword from "./UpdatePassword";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  // In starting modal is false after Click its become true
  const closeModal = () => setShowModal(false);
  const closeModal2 = () => setShowModal2(false);

  //Handle SideBar
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  //Handle Toggle Button When Sidebar Is Close
  const handleToggle = () => {
    setOpen(!open);
  };

  //GET User Data That Store In Local Storage 
  const Token = localStorage.getItem("userExist");
  const id = JSON.parse(Token).id;

  //GET Profile Image of USer
  const getProfile = async () => {
    await axios
      .get("http://192.168.1.172:5000/user/getProfileImg/" + id)
      .then((result) => {
        console.log("lll", result.data);
        setProfileImage(
          `http://192.168.1.172:5000/images/${result.data.result.profileImage}`
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProfile();
  }, []);

  //LOGOUT FUNCTIONALITY
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  
  return (
    <div>
      <div
        x-data="{ sidebarOpen: false }"
        className="flex h-screen bg-gray-200"
      >
        <div
          className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${
            sidebarOpen ? "block" : "hidden"
          }`}
          onClick={closeSidebar}
        ></div>
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
          }`}
        >
          {" "}
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="mb-2 ">
                <div
                  className={` bg-white dark:bg-gray-800 w-64 shadow flex justify-center items-center ${
                    open
                      ? " border-indigo-700 transform transition duration-300"
                      : ""
                  }`}
                >
                  <div
                    onClick={handleToggle}
                    className="relative border-b-4 border-transparent py-3"
                  >
                    <div className="pr-20 flex justify-center items-center space-x-3 cursor-pointer">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 dark:border-white border-gray-900">
                        <img
                          src={profileImage}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex font-semibold dark:text-white text-gray-900 text-lg">
                        <Link to="/dashboard"> DashBoard</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* {/ LOGOUT /} */}
          <div className="mt-3 ml-5 space-y-3 dark:text-white text-lg">
            <a
              href="#"
              onClick={logout}
              className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
            >
              <div className="mr-3 text-red-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
              </div>
              Logout
            </a>
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 focus:outline-none lg:hidden"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20M4 12H20M4 18H11"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container px-6 py-8 mx-auto">
              <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                  <div className="border-b-2 block md:flex">
                    <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
                      <div className="flex justify-between">
                        <span className="text-xl font-semibold block">
                          {JSON.parse(Token).username}
                        </span>
                        <button onClick={() => setShowModal(true)}>
                          <h3 className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800">
                            Edit
                          </h3>
                        </button>
                        {showModal && <EditPic closeModal={closeModal} />}
                      </div>

                      <span className="text-gray-600">
                        This information is secret so be careful
                      </span>
                      <div className="w-full p-8 mx-2 flex justify-center">
                        <img
                          id="showImage"
                          className="max-w-xs w-64 items-center border"
                          src={profileImage}
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                      <div className="flex bg-white rounded-lg shadow-xl justify-between items-center">
                        <h4 className="text-xl text-gray-900 font-bold">
                          Personal Info
                        </h4>
                  
                        <button
                          className="mr-10"
                          onClick={() => setShowModal2(true)}
                        >
                          <h3 className="text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800 ">
                            Update Password
                          </h3>
                        </button>
                        {showModal2 && <UpdatePassword closeModal2={closeModal2} />}
                      </div>
                      <ul className="mt-2 text-gray-700">
                        <li className="flex border-y py-2">
                          <span className="font-bold w-24">Full name:</span>
                          <span className="text-gray-700">
                            {JSON.parse(Token).username}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Mobile:</span>
                          <span className="text-gray-700">(123) 123-1234</span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Email:</span>
                          <span className="text-gray-700">
                            {JSON.parse(Token).email}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Languages:</span>
                          <span className="text-gray-700">
                            English, Spanish
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
