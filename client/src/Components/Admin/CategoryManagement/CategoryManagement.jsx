import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Categorymodal from "./Categorymodal";

const CategoryManagement = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeModal = () => setShowModal(false);

  const navigate = useNavigate();

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  //GET all the Category Type
  const getCategory = async () => {
    await axios
      .get("http://192.168.1.172:5000/category/getCategory")
      .then((result) => {
        setData(result.data.data);
        console.log(result.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getCategory();
  }, []);

  //DELETE API for destroy Category
  const deleteCate = async (id) => {
    await axios
      .delete("http://192.168.1.172:5000/category/deleteCate/" + id)
      .then((result) => {
        window.location.reload();
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  // PAGINATION Functionality
  const nextPage = () => {
    if (page === pageCount) return page;
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page === 1) return page;
    setPage(page - 1);
  };

  useEffect(() => {
    const pageDataCount = Math.ceil(data.length / 8);
    setPageCount(pageDataCount);

    if (page) {
      const LIMIT = 8;
      const skip = LIMIT * page;
      const dataskip = data.slice(page === 1 ? 0 : skip - LIMIT, skip);
      setPageData(dataskip);
    }
  }, [data]);

  const Token = localStorage.getItem("userExist");
  const role = JSON.parse(Token).isadmin;
  if (role === "User") {
    return <Navigate to="/dashboard" />;
  }

  //LOGOUT FUNCTIONALITY
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
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
        {/* *******************SIDEBAR******************* */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
          }`}
        >
          {" "}
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center">
              <svg
                className="w-12 h-12"
                viewBox="0 0 512 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
                  fill="#4C51BF"
                  stroke="#4C51BF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
                  fill="white"
                ></path>
              </svg>

              <span className="mx-2 text-2xl font-semibold text-white">
                Dashboard
              </span>
            </div>
          </div>
          <nav className="mt-10">
            <Link
              className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
              to="/"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                ></path>
              </svg>

              <span className="mx-3">Dashboard</span>
            </Link>
            <Link
              className="flex items-center px-6 py-2 mt-4 text-gray-100 bg-gray-700 bg-opacity-25"
              to="/Category"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                ></path>
              </svg>

              <span className="mx-3">Category</span>
            </Link>

            <Link
              className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
              to="/Product"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                ></path>
              </svg>

              <span className="mx-3">Product</span>
            </Link>

            <Link
              className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
              to="/User"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>

              <span className="mx-3">User</span>
            </Link>
          </nav>
          {/* **************************LOGOUT***************************** */}
          <div className="">
            <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span
                className="group-hover:text-gray-700"
                onClick={logout}
                to="/"
              >
                Logout({JSON.parse(Token).username})
              </span>
            </button>
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

              <div className="relative mx-4 lg:mx-0">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </span>

                <input
                  className="w-32 pl-10 pr-4 rounded-md form-input sm:w-64 focus:border-indigo-600"
                  type="text"
                  placeholder="Search"
                />
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="flex container px-6 py-8 justify-between">
              <button className="addBtn" onClick={() => setShowModal(true)}>
                <h3 className="text-4xl font-bold text-gray-700">
                  Add Category
                </h3>
              </button>
              {showModal && <Categorymodal closeModal={closeModal} />}

              {/* *********************PAGINATION******************** */}
              <div className="flex float-right justify-center items-center font-bold">
                <button
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={prevPage}
                >
                  PREV
                </button>
                <p>
                  {page} of {setPage}
                </p>
                <button
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={nextPage}
                >
                  NEXT
                </button>
              </div>
            </div>
            {/* *********************CATEGORY DASHBOARD********************** */}
            <div className="flex flex-col mt-8">
              <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Category
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          CategoryDescription
                        </th>

                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {data.map((item, i) => (
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {item.Category}
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-3 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
                              {item.ProductDescription}
                            </div>
                          </td>

                          <td className="px-4 py-3 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                            <Link
                              href="#"
                              className="px-4 text-indigo-600 hover:text-indigo-900"
                              to={`/updateCategory/${item.id}`}
                            >
                              Edit
                            </Link>
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900 "
                              onClick={() => deleteCate(item.id)}
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default CategoryManagement;
