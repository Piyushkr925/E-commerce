import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [isVerified, setisVerified] = useState("");
  const [isadmin, setIsAdmin] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setprofileImage] = useState(null);


  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  //Set the Product Image
  const handleFileChange = (event) => {
    setprofileImage(event.target.files[0]);
  };


  //UPDATE Function for update the Product
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("isadmin", isadmin);
    formData.append("isVerified", isVerified);
    formData.append("profileImage", profileImage);
    axios
      .patch("http://192.168.1.172:5000/user/updateUser/" + id, formData)
      .then((res) => {
        console.log(res);
        navigate("/User");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  //GET all the Product Details
  const getOneDetail = async () => {
    await axios
      .get("http://192.168.1.172:5000/user/oneUserDetail/" + id)
      .then((result) => {
        console.log(result);
        setEmail(result.data.result.email);
        setIsAdmin(result.data.result.isadmin);
        setisVerified(result.data.result.isVerified);
        setprofileImage(result.data.result.profileImage);
        setUsername(result.data.result.username);
      })
      .catch((err) => console.log(err));
  };

  // Trigger click event on file input when the user clicks on the image name
  const handleImageClick = () => {
    fileInputRef.current.click();
  };



  useEffect(() => {
    getOneDetail();
  }, []);

  return (
    //****************************UPDATE PRODUCT***********************/
    <div className="bg-slate-800  bg-opacity-70 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="relative h-3/4 overflow-scroll">
        <div className="relative px-6 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-20">
          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
            <div className="py-2 text-base leading-6 space-y-2 text-gray-700 sm:text-lg sm:leading-7">
              <div className="flex flex-col">
                <label className="leading-loose">Name</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="px-6 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Optional"
                />
              </div>

              <div className="flex flex-col">
                <label className="leading-loose">Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Optional"
                />
              </div>
              <div className="flex flex-col">
                <label className="leading-loose">Profile Image</label>
                <input
                  type="text"
                  value={profileImage}
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
                <label className="leading-loose">Role</label>
                <input
                  type="text"
                  value={isadmin}
                  onChange={(e) => setIsAdmin(e.target.value)}
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Optional"
                />
              </div>
              <div className="flex flex-col">
                <label className="leading-loose">Verified</label>
                <input
                  type="text"
                  value={isVerified}
                  onChange={(e) => setisVerified(e.target.value)}
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Optional"
                />
              </div>
          

           
            </div>
            <div className="pt-4 flex items-center space-x-6">
              <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                Create
              </button>
              <Link
                to={"/User"}
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

export default EditUser;
