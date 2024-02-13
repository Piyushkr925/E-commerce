import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Admindash = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  //GET ALLPRODUCT in Admin DashBoard
  const getProducts = async () => {
    await axios
      .get("http://192.168.1.172:5000/product/productCategory")
      .then((result) => {
        setData(result.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getProducts();
  }, [page]);

  // SEARCH Different Product
  const search = async (e) => {
    const key = e.target.value;
    if (key) {
      let srdata = await fetch(`http://192.168.1.172:5000/product/search/${key}`);
      srdata = await srdata.json();
      if (srdata) {
        setData(srdata);
      }
    } else {
      getProducts();
    }
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
          <div
            className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0 ${
              sidebarOpen
                ? "translate-x-0 ease-out"
                : "-translate-x-full ease-in"
            }`}
          >
            {/***********************************SIDEBAR******************************/}
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
                className="flex items-center px-6 py-2 mt-4 text-gray-100 bg-gray-700 bg-opacity-25"
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
                className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
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
            {/* {/ LOGOUT /} */}
            <div className="">
              <button className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
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
                    onChange={search}
                    type="text"
                    placeholder="Search"
                  />
                </div>
              </div>
            </header>
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
              <div className="flex container px-6 py-8 justify-between">
                <h3 className="text-4xl font-bold text-gray-700">Dashboard</h3>

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

              <div className="container ">
                <div className="flex flex-col mt-8">
                  <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                      <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {pageData.map((item, i) => (
                          <article
                            key={item.id}
                            className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 "
                          >
                            <a href="#">
                              <div className="relative flex items-end overflow-hidden rounded-xl">
                                <img
                                  src={`http://192.168.1.172:5000/images/${item.ProductImage}`}
                                  alt="Hotel Photo"
                                />
                                <div className="absolute bottom-3 left-1 inline-flex items-center rounded-lg bg-white p-1 shadow-md">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-yellow-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span className="ml-1 text-sm text-slate-400">
                                    {item.Rating}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                    />
                                  </svg>

                                  <button className="text-sm">
                                    Add to cart
                                  </button>
                                </div>
                              </div>

                              <div className="mt-1 p-2">
                                <h2 className="text-slate-700">
                                  {item.BrandName}
                                </h2>
                                <p className="mt-0 text-sm text-slate-400">
                                  {item.ProductDescription}
                                </p>
                                <h2 className="text-slate-700">
                                  {item.category.Category}, {item.Type}
                                </h2>
                                <div className="mt-1 flex items-end justify-between">
                                  <p className="text-lg font-bold text-blue-500">
                                    ${item.Price}
                                  </p>

                                  <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      className="h-4 w-4"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                      />
                                    </svg>

                                    <button className="text-sm">
                                      Add to cart
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
    </>
  );
};

export default Admindash;
