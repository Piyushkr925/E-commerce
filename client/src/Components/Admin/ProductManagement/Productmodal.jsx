import axios from "axios";
import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Productmodal = ({ closeModal }) => {
  const [data, setData] = useState([]);
  const [categoryId, setCategory] = useState("");
  const [BrandName, setBrandName] = useState("");
  const [Rating, setRating] = useState("");
  const [Price, setPrice] = useState("");
  const [ProductImage, setProductImage] = useState(null);
  const [Type, setType] = useState("");
  const [ProductDescription, setProductDescription] = useState("");

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

  //POST function for Append all the Product Type
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
      .post("http://192.168.1.172:5000/product/addProduct", formData)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  //GET the type of Category
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

  return (
    //*********************ADD PRODUCT MODAL**************************/
    <div className="bg-slate-800  bg-opacity-70 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="relative h-3/4 overflow-scroll">
        <div className="relative px-6 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-20">
          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
            <div className="py-2 text-base leading-6 space-y-2 text-gray-700 sm:text-lg sm:leading-7">
              <div className="flex flex-col">
                <label className="leading-loose">BrandName</label>
                <input
                  type="text"
                  onChange={(e) => setBrandName(e.target.value)}
                  className="px-6 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Optional"
                />
              </div>

              <div className="flex flex-col">
                <label className="leading-loose">Rating</label>
                <input
                  type="text"
                  onChange={(e) => setRating(e.target.value)}
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Optional"
                />
              </div>
              <div className="flex flex-col">
                <label className="leading-loose">ProductImage</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Optional"
                />
              </div>
              <div className="flex flex-col">
                <label className="leading-loose">Price</label>
                <input
                  type="text"
                  onChange={(e) => setPrice(e.target.value)}
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Optional"
                  onKeyDown={restrictAlphabet}
                />
              </div>
              <div className="flex flex-col">
                <label className="leading-loose">Type</label>
                <select onChange={(e) => setType(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Casual Shoes">Casual Shoes</option>
                  <option value="Sneakers">Sneakers</option>
                  <option value="Formal Shoes">Formal Shoes</option>
                  <option value="Sport Shoes">Sport Shoes</option>
                </select>
                {/* <input
                  type="text"
                  onChange={(e) => setType(e.target.value)}
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Optional"
                /> */}
              </div>
              <div className="flex flex-col w-96">
                <label className="leading-loose">ProductDescription</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={ProductDescription}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(e, editor) => {
                    const data = editor.getData();
                    setProductDescription(data);
                  }}
                  onBlur={(e, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(e, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
                {/* <input
                  type="text"
                  onChange={(e) => }
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Optional"
                /> */}
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
              <button
                onClick={closeModal}
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
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Productmodal;
