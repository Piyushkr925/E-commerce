import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [showProfile, setShowProfile] = useState([]);
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const navigate = useNavigate();

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  //Store Local Storage Data like User Data In Token
  const Token = localStorage.getItem("userExist");
  const id = JSON.parse(Token).id;

  //GET ALLPRODUCT in DashBoard
  const getProducts = async () => {
    await axios
      .get("http://192.168.1.172:5000/product/productCategory")
      .then((result) => {
        setData(result.data.data);
        setShowProfile(result.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getProducts();
  }, [page]);

  //GET User Profile Image
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

  // SEARCH API of Product for BrandName
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

  //Sort Price In Ascending Order(LowToHigh)
  const sortingAsc = (event) => {
    setSelectedOption(event.target.value);
    axios
      .get("http://192.168.1.172:5000/product/sortAsc")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  //Sort Price In Descending Order(HighToLow)
  const sortingDesc = (event) => {
    setSelectedOption(event.target.value);
    axios
      .get("http://192.168.1.172:5000/product/sortdesc")
      .then((res) => {
        setData(res.data.Data);
      })
      .catch((err) => console.log(err));
  };

  //Handle Sorting Option
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // PAGINATION FUNCTIONALITY
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

  //Get isAdmin is User or Admin
  const role = JSON.parse(Token).isadmin;
  if (role === "Admin") {
    return <Navigate to="/admindash" />;
  }

  //Filter Product By Product Type
  const filterResult = (catItem) => {
    const result = showProfile.filter((curData) => {
      return curData.Type === catItem;
    });
    setData(result);
  };

  // LOGOUT FUNCTIONALITY
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
            sidebarOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
          }`}
        >
          {/* ***********************SIDEBAR*************************** */}
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
                        <div className="cursor-pointer">
                          {JSON.parse(Token).username}
                        </div>
                      </div>
                    </div>
                    {open && (
                      <div className=" z-30 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0 absolute w-60 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5">
                        <ul className="space-y-3 dark:text-white">
                          <li className="font-medium">
                            <Link
                              to="/profile"
                              className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                            >
                              <div className="mr-3">
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
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  ></path>
                                </svg>
                              </div>
                              Account
                            </Link>
                          </li>
                       
                          <hr className="dark:border-gray-700" />
                          <li className="font-medium">
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
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav className="mt-2 ">
            <h3 className="mb-4 text-white font-semibold  flex justify-center items-center  ">
              Your Type
            </h3>
            <ul className=" w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className=" w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-license"
                    type="radio"
                    onClick={() => filterResult("Casual Shoes")}
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="list-radio-license"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Casual Shoes
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-id"
                    type="radio"
                    onClick={() => filterResult("Sport Shoes")}
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="list-radio-id"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Sport Shoes
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-military"
                    type="radio"
                    onClick={() => filterResult("Sneakers")}
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="list-radio-military"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Sneakers
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-passport"
                    type="radio"
                    onClick={() => filterResult("Formal Shoes")}
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="list-radio-passport"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Formal Shoes
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-passport"
                    type="radio"
                    value=""
                    onClick={() => setData(showProfile)}
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="list-radio-passport"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    All
                  </label>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* ******************************NAVBAR****************************** */}
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
              <div className="ml-10">
                <label>Sort By :</label>
                <label>
                  {" "}
                  <input
                    type="radio"
                    value="option2"
                    checked={selectedOption === "option2"}
                    onChange={sortingAsc}
                  />{" "}
                  By Ascending{" "}
                </label>
                <label>
                  {" "}
                  <input
                    type="radio"
                    value="option3"
                    checked={selectedOption === "option3"}
                    onChange={sortingDesc}
                  />{" "}
                  By Descending{" "}
                </label>
              </div>
            </div>
          </header>

          {/* *******************************DASHBOARD**************************** */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container px-6 py-8 mx-auto">
              <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>
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

                                <button className="text-sm">Add to cart</button>
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
                <div className="mt-10 inline-flex -space-x-px flex justify-center items-center">
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
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
