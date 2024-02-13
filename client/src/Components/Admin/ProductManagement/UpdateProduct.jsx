import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [data, setData] = useState([]);
  const [categoryId, setCategory] = useState("");
  const [BrandName, setBrandName] = useState("");
  const [Rating, setRating] = useState("");
  const [Price, setPrice] = useState("");
  const [ProductImage, setProductImage] = useState(null);
  const [Type, setType] = useState("");
  const [ProductDescription, setProductDescription] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  //Set the Product Image
  const handleFileChange = (event) => {
    setProductImage(event.target.files[0]);
  };

  //In Price Column Enter only Integer 
  const restrictAlphabet = (e) => {
    const x = e.which || e.keyCode;
    if (!((x >= 48 && x <= 57) || x === 8)) {
      e.preventDefault();
    }
  };

  //UPDATE Function for update the Product
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("BrandName", BrandName);
    formData.append("Rating", Rating);
    formData.append("Price", Price);
    formData.append("Type", Type);
    formData.append("ProductDescription", ProductDescription);
    formData.append("ProductImage", ProductImage);
    formData.append("categoryId", categoryId);

    axios
      .patch("http://192.168.1.172:5000/product/updateProduct/" + id, formData)
      .then((res) => {
        console.log(res);
        navigate("/Product");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  //GET all the Product Details
  const getProductDetails = async () => {
    await axios
      .get("http://192.168.1.172:5000/product/productDetail/" + id)
      .then((result) => {
        console.log(result);
        setBrandName(result.data.result.BrandName);
        setRating(result.data.result.Rating);
        setPrice(result.data.result.Price);
        setType(result.data.result.Type);
        setProductImage(result.data.result.ProductImage);
        setProductDescription(result.data.result.ProductDescription);
        setCategory(result.data.result.categoryId);
      })
      .catch((err) => console.log(err));
  };

  // Trigger click event on file input when the user clicks on the image name
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  //GET the all Category Type
  const getCategory = async () => {
    await axios
      .get("http://192.168.1.172:5000/category/getCategory")
      .then((result) => {
        setData(result.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCategory();
    getProductDetails();
  }, []);

  return (
    //****************************UPDATE PRODUCT***********************/
    <div className="bg-slate-800  bg-opacity-70 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="relative h-3/4 overflow-scroll">
        <div className="relative px-6 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-20">
          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
            <div className="py-2 text-base leading-6 space-y-2 text-gray-700 sm:text-lg sm:leading-7">
              <div className="flex flex-col">
                <label className="leading-loose">BrandName</label>
                <input
                  type="text"
                  value={BrandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="px-6 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Optional"
                />
              </div>

              <div className="flex flex-col">
                <label className="leading-loose">Rating</label>
                <input
                  type="text"
                  value={Rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Optional"
                />
              </div>
              <div className="flex flex-col">
                <label className="leading-loose">ProductImage</label>
                <input
                  type="text"
                  value={ProductImage}
                  onClick={handleImageClick}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder=""
                />
              </div>
              <div className="flex flex-col">
                <label className="leading-loose">Price</label>
                <input
                  type="text"
                  value={Price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Optional"
                  onKeyDown={restrictAlphabet}
                />
              </div>
              <div className="flex flex-col">
                <label className="leading-loose">Type</label>
                <input
                  type="text"
                  value={Type}
                  onChange={(e) => setType(e.target.value)}
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Optional"
                />
              </div>
              <div className="flex flex-col">
                <label className="leading-loose">ProductDescription</label>
                <input
                  type="text"
                  value={ProductDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Optional"
                />
              </div>

              <div className="flex flex-col">
                <label className="leading-loose">CategoryID</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select</option>
                  {data.map((item, i) => (
                    <option value={item.id}>{item.Category}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="pt-4 flex items-center space-x-6">
              <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                Create
              </button>
              <Link
                to={"/Product"}
                className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>{" "}
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
