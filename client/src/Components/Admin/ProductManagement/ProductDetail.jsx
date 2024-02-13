import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductDetail = () => {
  const [data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoryId, setCategory] = useState("");
  const [BrandName, setBrandName] = useState("");
  const [Rating, setRating] = useState("");
  const [Price, setPrice] = useState("");
  const [ProductImage, setProductImage] = useState(null);
  const [Type, setType] = useState("");
  const [ProductDescription, setProductDescription] = useState("");
  const { id } = useParams();

  // In starting modal is false after Click its become true

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

  //GET all the Product Details
  const getOneDetail = async () => {
    await axios
      .get("http://192.168.1.172:5000/product/productDetail/" + id)
      .then((result) => {
        console.log(result);
        setBrandName(result.data.result.BrandName);
        setType(result.data.result.Type);
        setCategory(result.data.result.categoryId);
        setRating(result.data.result.Rating);
        setProductImage(
          `http://192.168.1.172:5000/images/${result.data.result.ProductImage}`
        );
        setPrice(result.data.result.Price);
        setProductDescription(result.data.result.ProductDescription);

      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOneDetail();
  }, []);

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
                      <div className="flex font-semibold dark:text-white text-gray-900 text-lg">
                        <Link to="/Product">Go Back</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* {/ LOGOUT /} */}
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

                        </span>
                      </div>
                      <span className="text-gray-600">
                        This information for your view
                      </span>
                      <div className="w-full p-8 mx-2 flex justify-center">
                        <img
                          id="showImage"
                          className="max-w-xs w-64 items-center border"
                          src={ProductImage}
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                      <div className="flex bg-white rounded-lg shadow-xl justify-between items-center">
                        <h4 className="text-xl text-gray-900 font-bold">
                          Product Info
                        </h4>
                      </div>
                      <ul className="mt-2 text-gray-700">
                        <li className="flex border-y py-2">
                          <span className="font-bold w-24">BrandName:</span>
                          <span className="text-gray-700">{BrandName}</span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Type:</span>
                          <span className="text-gray-700">{Type}</span>
                        </li>
                  
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Price:</span>
                          <span className="text-gray-700">${Price}</span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Rating:</span>
                          <span className="text-gray-700">{Rating}</span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Description:</span>
                          <span className="text-gray-700">{ProductDescription}</span>
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

export default ProductDetail;
